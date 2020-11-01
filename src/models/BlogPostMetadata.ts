export interface BlogPostMetadata {
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
  };
  slug: string;
}
