import { Rental } from '@/schemas/rental.schema';
import { rentalsService } from '@/services/rentals.service';
import dayjs from 'dayjs';
import { Request, Response } from 'express';

export async function postRent(req: Request, res: Response) {
    const { customerId, gameId, daysRented }: Rental = req.body;
    const rentDate = new Date()
    const returnDate = null;
    const delayFee = null;

    await rentalsService.postRental({ customerId, gameId, daysRented, rentDate, returnDate, delayFee })
    res.status(201).send({message:
        `Aluguel de ${dayjs(rentDate).format('DD/MM/YYYY')} cadastrado`});
}

export async function getRents(req: Request, res: Response) {
    const { customerId, gameId } = req.query as unknown as
        { customerId: number, gameId: number };
    const rentals = await rentalsService.getRentals(+customerId, +gameId)
    res.status(200).send(rentals);
}

export async function postRentReturn(req: Request, res: Response) {
    const { id } = req.params;
    const gameRented = await rentalsService.rentalReturn(+id);
    res.status(200).send({message:`Aluguel de ${gameRented!.name} devolvido em
    ${dayjs(Date.now()).format('DD/MM/YYYY')}`});
}
export async function deleteRent(req: Request, res: Response) {
    const { id } = req.params;
    await rentalsService.deleteRental(+id);
    res.sendStatus(204);
}