import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string().optional().default('Blog post.'),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional().default('/posts-default-image.jpg'),
	}),
});

export const collections = { posts };
