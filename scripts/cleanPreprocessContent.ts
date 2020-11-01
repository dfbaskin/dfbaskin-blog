import rimrafCallback from "rimraf";
import mkdirp from "mkdirp";
import { promisify } from "util";
import { postsPagesPath, imagesPath } from "./buildInfo";

const rimraf = promisify(rimrafCallback);

main().catch((err) => console.error(err));

async function main() {
  await rimraf(postsPagesPath);
  await rimraf(imagesPath);
  await mkdirp(postsPagesPath);
  await mkdirp(imagesPath);
  console.log("Cleaned up pre-processing files.");
}
