import { z } from "zod";

export const idParamsSchema = z.object({
  id: z.string().transform((idParam, ctx) => {
    const result = z.coerce.number().int().positive().safeParse(idParam)
    if (!result.success)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Id must be a positive integer"
      })
    return parseInt(idParam);
  })
})