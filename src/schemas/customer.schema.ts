import { z } from 'zod';

export const customerSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10).max(11).regex(/^\d+$/),
    cpf: z.string().length(11).regex(/^\d+$/),
    birthday: z.date()
})