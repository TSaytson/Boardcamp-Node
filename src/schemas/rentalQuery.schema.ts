import { z } from "zod";

export const idQuerySchema = z.object({
  customerId: z.string().optional().transform((idParam, ctx) => {
    if (idParam) {
      const result = z.coerce.number().int().positive().safeParse(idParam)
      if (!result.success)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Id must be a positive integer"
        })
      return parseInt(idParam);
    }
  }),
  gameId: z.string().optional().transform((idParam, ctx) => {
    if (idParam) {
      const result = z.coerce.number().int().positive().safeParse(idParam)
      if (!result.success)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Id must be a positive integer"
        })
      return parseInt(idParam);
    }
  })
})