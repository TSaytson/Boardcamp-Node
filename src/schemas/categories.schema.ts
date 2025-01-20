import { z } from "zod";

export const categorieSchema = z.object({
  name: z.string().min(3)
})

export type Category = z.infer<typeof categorieSchema>