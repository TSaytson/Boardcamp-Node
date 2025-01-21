import { z } from 'zod';

export const rentalSchema = z.object({
    customerId: z.number().int().min(1),
    gameId: z.number().int().min(1),
    daysRented: z.number().int().min(1),
});

export type Rental = z.infer<typeof rentalSchema>