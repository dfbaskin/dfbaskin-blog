import { join } from "path";

export const contentPath = join(__dirname, "..", "content/posts");
export const postsPagesPath = join(__dirname, "..", "pages/posts");
export const catalogPath = join(postsPagesPath, "posts-catalog.json");
export const imagesPath = join(__dirname, "..", "public/posts/images");
