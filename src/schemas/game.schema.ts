import { z } from 'zod';

export const gameSchema = z.object({
    name: z.string().min(2),
    image: z.string().url(),
    stockTotal: z.number().int().positive(),
    pricePerDay: z.number().int().positive(),
    categoryId: z.number().int().positive()
})

export type Game = z.infer<typeof gameSchema>