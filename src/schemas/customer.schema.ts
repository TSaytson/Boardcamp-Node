import { z } from 'zod';

export const customerSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10).max(11).regex(/^\d+$/),
    cpf: z.string().length(11).regex(/^\d+$/),
    birthday: z.string().
        transform((dateString, ctx) => {
            const date = new Date(dateString)
            const result = z.date().safeParse(date)
            if (!result.success || dateString.length !== 10){
                ctx.addIssue({
                    code: z.ZodIssueCode.invalid_date,
                    message: 'Invalid date'
                })
            }
            return date;
        })
})

export const updateCustomerSchema = customerSchema.omit({cpf:true})

export type Customer = z.infer<typeof customerSchema>

export type CustomerEntity = Customer & {
    id: number
}