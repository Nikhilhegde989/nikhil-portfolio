import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()),
    thumbnail: z.string().optional(),
    readingTime: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
