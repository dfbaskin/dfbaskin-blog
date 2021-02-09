import { promisify } from "util";
import mkdirp from "mkdirp";
import fs from "fs";
import { join, resolve, relative, extname, basename } from "path";
import matter from "gray-matter";
import { of, from, pipe, concat, merge, Observable, EMPTY } from "rxjs";
import { mergeMap, map, reduce, filter, share } from "rxjs/operators";
import {
  contentPath,
  postsPagesPath,
  imagesPath,
  catalogPath,
} from "./buildInfo";

const watchMode = process.argv.slice(2).reduce((wm, arg) => {
  if (!wm) {
    wm = arg === "-w" || arg === "--watch";
  }
  return wm;
}, false);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const stat = promisify(fs.stat);

interface ItemFileDetails {
  file: {
    rootPath: string;
    relativePath: string;
    extension: string;
  };
}
interface MarkdownItemDetails extends ItemFileDetails {
  frontmatter: {
    date: string;
    [key: string]: any;
  };
  slug: string;
}
function isMarkdownItem(
  item: ItemFileDetails | MarkdownItemDetails
): item is MarkdownItemDetails {
  return (item as MarkdownItemDetails).frontmatter !== undefined;
}
function isStyleItem(item: ItemFileDetails) {
  return item.file.extension === ".css";
}

const distinctUntilChangedOrTimeout = () => {
  const timeout = 1000;
  let lastValue: string | undefined;
  let lastTime: number = 0;
  return (source: Observable<string>) => {
    return source.pipe(
      mergeMap((value) => {
        const timedOut = Date.now() - lastTime > timeout;
        if (!lastValue || value !== lastValue || timedOut) {
          lastValue = value;
          lastTime = Date.now();
          return of(value);
        }
        return EMPTY;
      })
    );
  };
};

const initialFileStream = of(null).pipe(
  mergeMap(() => readdirRecursive(contentPath)),
  mergeMap((items) => {
    const list = items.map((relativePath) => {
      const extension = extname(relativePath).toLowerCase();
      const item: ItemFileDetails = {
        file: {
          rootPath: contentPath,
          relativePath,
          extension,
        },
      };
      return item;
    });
    return from(list);
  }),
  mergeMap((item) => {
    if (item.file.extension === ".md") {
      return of(item).pipe(loadMarkdownContent());
    }
    return of(item);
  }),
  share()
);

const watchFileStream = new Observable<string>((subscriber) => {
  if (!watchMode) {
    subscriber.complete();
    return;
  }
  console.log("Watching for file changes ...");
  const options = {
    recursive: true,
  };
  fs.watch(contentPath, options, (eventType, filename) => {
    if (eventType === "change" && filename) {
      subscriber.next(filename);
    }
  });
}).pipe(
  distinctUntilChangedOrTimeout(),
  map((relativePath) => {
    console.log(`  - ${relativePath}`);
    const extension = extname(relativePath).toLowerCase();
    const item: ItemFileDetails = {
      file: {
        rootPath: contentPath,
        relativePath,
        extension,
      },
    };
    return item;
  }),
  mergeMap((item) => {
    if (item.file.extension === ".md") {
      return of(item).pipe(loadMarkdownContent());
    }
    return of(item);
  }),
  share()
);

const fileStream = concat(initialFileStream, watchFileStream);

const catalogStream = fileStream.pipe(
  filter((item) => isMarkdownItem(item)),
  reduce((catalog, item) => {
    catalog.push(item as MarkdownItemDetails);
    return catalog;
  }, [] as MarkdownItemDetails[]),
  mergeMap((catalog) => {
    const sorted = catalog
      .map(({ frontmatter, slug }) => ({
        frontmatter,
        slug,
      }))
      .sort(({ frontmatter: { date: d1 } }, { frontmatter: { date: d2 } }) => {
        if (d1 < d2) {
          return 1;
        } else if (d1 > d2) {
          return -1;
        } else {
          return 0;
        }
      });
    const content = JSON.stringify(sorted, null, 2);
    return writeFile(catalogPath, content, "utf8");
  })
);

const imageStream = fileStream.pipe(
  filter((item) => !isMarkdownItem(item) && !isStyleItem(item)),
  mergeMap((item) => {
    const {
      file: { rootPath, relativePath },
    } = item;
    const sourceFile = join(rootPath, relativePath);
    const destFile = join(imagesPath, basename(relativePath));
    return copyFile(sourceFile, destFile);
  })
);

const stylesStream = fileStream.pipe(
  filter((item) => !isMarkdownItem(item) && isStyleItem(item)),
  mergeMap((item) => {
    const {
      file: { rootPath, relativePath },
    } = item;
    const sourceFile = join(rootPath, relativePath);
    const destFile = join(postsPagesPath, basename(relativePath));
    return copyFile(sourceFile, destFile);
  })
);

const initializationStream = of(null).pipe(mergeMap(() => createBuildPaths()));

concat(
  initializationStream,
  merge(fileStream, catalogStream, imageStream, stylesStream)
).subscribe({
  error(err) {
    console.error(err);
  },
  complete() {
    console.log("Finished.");
  },
});

function loadMarkdownContent() {
  const matterOptions = {
    excerpt: false,
    // excerpt: (file) => {
    //   file.excerpt = file.content.split("\n\n").slice(0, 2).join("\n");
    // },
  };
  return pipe(
    mergeMap((item: ItemFileDetails) => {
      const {
        file: { rootPath, relativePath },
      } = item;
      return readFile(join(rootPath, relativePath), "utf8").then((content) => ({
        ...item,
        matter: matter(content, matterOptions),
      }));
    }),
    mergeMap((item) => {
      const {
        file: { relativePath },
        matter: { data, content },
      } = item;
      const frontmatter = data;
      const slug = `/posts/${basename(relativePath, extname(relativePath))}`;
      const fileName = join(
        postsPagesPath,
        `${basename(relativePath, extname(relativePath))}.mdx`
      );
      const wrapped = wrapMdxContent({
        meta: {
          ...frontmatter,
          slug,
        },
        content,
      });

      return of(item).pipe(
        mergeMap(() => writeFile(fileName, wrapped, "utf8")),
        map(() => {
          const { file } = item;
          return {
            file,
            frontmatter,
            slug,
          };
        })
      );
    })
  );
}

async function createBuildPaths() {
  await mkdirp(postsPagesPath);
  await mkdirp(imagesPath);
}

async function readdirRecursive(path: string) {
  const items = [];
  for await (const entry of readdirRecursiveIterator(path)) {
    items.push(relative(path, entry));
  }
  return items;
}

async function* readdirRecursiveIterator(path: string): AsyncGenerator<string> {
  for (const entry of await readdir(path)) {
    const subPath = resolve(path, entry);
    const entryStat = await stat(subPath);
    if (entryStat.isDirectory()) {
      yield* await readdirRecursiveIterator(subPath);
    } else {
      yield subPath;
    }
  }
}

interface MdxData {
  meta: {
    [key: string]: any;
  };
  content: string;
}

function wrapMdxContent({ meta, content }: MdxData) {
  return `
import {BlogPost} from "../../src/components/BlogPost";

export const meta = ${JSON.stringify(meta, null, 2)};

<BlogPost meta={meta}>

${content}

</BlogPost>
`;
}
