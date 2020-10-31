const { promisify } = require("util");
const fs = require("fs");
const { join, resolve, relative, extname, basename } = require("path");
const matter = require("gray-matter");
const { of, from, pipe, merge } = require("rxjs");
const { mergeMap, map, reduce, filter } = require("rxjs/operators");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const contentPath = join(__dirname, "..", "content/posts");
const postsPagesPath = join(__dirname, "..", "pages/posts");
const catalogPath = join(postsPagesPath, "posts-catalog.json");

const fileStream = of(null).pipe(
  mergeMap(() => readdirRecursive(contentPath)),
  mergeMap((items) => {
    const list = items.map((relativePath) => {
      const extension = extname(relativePath).toLowerCase();
      return {
        file: {
          rootPath: contentPath,
          relativePath,
          extension,
        },
      };
    });
    return from(list);
  }),
  mergeMap((item) => {
    if (item.file.extension === ".md") {
      return of(item).pipe(loadMarkdownContent());
    }
    return of(item);
  })
);

const catalogStream = fileStream.pipe(
  filter((item) => item.frontmatter),
  reduce((catalog, item) => {
    catalog.push(item);
    return catalog;
  }, []),
  mergeMap((catalog) => {
    const sorted = catalog
      .map(({ frontmatter, slug }) => ({
        frontmatter,
        slug,
      }))
      .sort(({ date: d1 }, { date: d2 }) => {
        if (d1 < d2) {
          return -1;
        } else if (d1 > d2) {
          return 1;
        } else {
          return 0;
        }
      });
    const content = JSON.stringify(sorted, null, 2);
    return writeFile(catalogPath, content, "utf8");
  })
);

merge(fileStream, catalogStream).subscribe({
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
    mergeMap((item) => {
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

async function readdirRecursive(path) {
  const items = [];
  for await (const entry of readdirRecursiveIterator(path)) {
    items.push(relative(path, entry));
  }
  return items;
}

async function* readdirRecursiveIterator(path) {
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

function wrapMdxContent({ meta, content }) {
  return `
import {BlogPost} from "../../src/components/BlogPost";

export const meta = ${JSON.stringify(meta, null, 2)};

<BlogPost>

${content}

</BlogPost>
`;
}
