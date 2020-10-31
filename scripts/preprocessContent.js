const { promisify } = require("util");
const fs = require("fs");
const { join, resolve, relative, extname, basename } = require("path");
const matter = require("gray-matter");
const { of, from, defer, pipe } = require("rxjs");
const { mergeMap, map, tap } = require("rxjs/operators");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const contentPath = join(__dirname, "..", "content/posts");
const postsPagesPath = join(__dirname, "..", "pages/posts");

of(null)
  .pipe(
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
  )
  .subscribe({
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
      return of(item).pipe(
        mergeMap((item) => {
          const {
            file: { relativePath },
            matter: { content },
          } = item;
          const fileName = join(
            postsPagesPath,
            `${basename(relativePath, extname(relativePath))}.mdx`
          );
          return writeFile(fileName, content, "utf8");
        }),
        map(() => {
          const { file } = item;
          const {
            file: { relativePath },
            matter,
          } = item;
          return {
            file,
            frontmatter: matter.data,
            isEmpty: matter.isEmpty,
            slug: `/posts/${basename(relativePath, extname(relativePath))}`,
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
