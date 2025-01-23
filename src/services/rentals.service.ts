import { customersRepository } from "../repositories/customers.repository";
import { gamesRepository } from "../repositories/games.repository";
import { rentalsRepository } from "../repositories/rentals.repository";
import { badRequestError, notFoundError } from "../utils/errorUtils";
import { Rental } from "@prisma/client";
import dayjs from "dayjs";

async function postRental({customerId, gameId, rentDate, daysRented, returnDate, delayFee}
  :Omit<Rental, 'id' | 'originalPrice' | 'createdAt' | 'updatedAt'>) {
  const customerFound = await customersRepository.findCustomerById(customerId);
  if (!customerFound)
    throw notFoundError('Customer not found');
  const gameFound = await gamesRepository.findGameById(gameId);
  if (!gameFound)
    throw notFoundError('Game not found');
  const gameRentals = await rentalsRepository.findOpenRentalsByGameId(gameId);
  if (gameRentals.length >= gameFound.stockTotal)
    throw badRequestError('Game sold out');
  const originalPrice =
    (daysRented) * (gameFound.pricePerDay);

  return await rentalsRepository.createRental({
    customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee
  })
}

async function getRentals(customerId:number, gameId:number) {
  if (gameId && customerId) {
    return await rentalsRepository.findRentalsByCustomerIdGameId({ customerId, gameId })
  }
  else if (customerId) {
    return await rentalsRepository.findRentalsByCustomerId(customerId);
  }
  else if (gameId) {
    return await rentalsRepository.findRentalsByGameId(gameId);
  }
  else {
    return await rentalsRepository.findRentals();
  }
}

async function rentalReturn(rentalId:number) {
  const rentalFound = await rentalsRepository.findRentalById(rentalId);
  if (!rentalFound)
    throw notFoundError('Rental not found');
  if (rentalFound.returnDate)
    throw badRequestError('Game already returned');
  const gameRented = await gamesRepository.findGameById(rentalFound.gameId);
  rentalFound.returnDate = new Date();
  const dateToBeReturned = dayjs(rentalFound.rentDate).add(rentalFound.daysRented, 'days');
  const diffDays = (dayjs(rentalFound.returnDate).diff(dayjs(dateToBeReturned), 'days'))
  if (diffDays > 0)
    rentalFound.delayFee = diffDays * gameRented!.pricePerDay;

  await rentalsRepository.updateRental(rentalFound);
  return gameRented;

}

async function deleteRental(id:number) {
  const rentalFound = await rentalsRepository.findRentalById(id);
  if (!rentalFound)
    throw notFoundError('Rental not found');
  if (!rentalFound.returnDate)
    throw badRequestError('Rental is still open');
  return await rentalsRepository.deleteRental(id);

}

export const rentalsService = {
  postRental,
  getRentals,
  rentalReturn,
  deleteRental
}