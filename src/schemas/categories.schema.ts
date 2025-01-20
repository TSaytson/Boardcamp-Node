import { z } from "zod";

export const categorieSchema = z.object({
  name: z.string().min(3)
})