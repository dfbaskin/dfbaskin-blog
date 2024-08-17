import { defineCollection, z } from "astro:content";
import type { ImageMetadata } from "astro";

const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default("Blog post."),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.custom<ImageMetadata>().optional(),
  }),
});

export const collections = { posts };
