import prisma from "../config/database";
import { Rental } from "@prisma/client";

async function createRental(rental:Omit<Rental, 'id' | 'createdAt' | 'updatedAt'>) {
  return await prisma.rental.create({
    data: rental
  });
}

async function findRentalsOnly() {
  return await prisma.rental.findMany()
}

async function findRentals() {
  return await prisma.rental.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        }
      },
      game: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })
}

async function findRentalById(id:number) {
  return await prisma.rental.findUnique({
    where: {id}
  })
}

async function findRentalsByCustomerIdGameId({ customerId, gameId }) {
  return await prisma.rental.findMany({
    where: {customerId, gameId},
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        }
      },
      game: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })
}

async function findRentalsByCustomerId(customerId:number) {
  return await prisma.rental.findMany({
    where: {customerId},
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        }
      },
      game: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })
}

async function findRentalsByGameId(gameId:number) {
  return await prisma.rental.findMany({
    where: {gameId},
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        }
      },
      game: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })
}

async function updateRental({ id, returnDate, delayFee }) {
  return prisma.rental.update({
    where: {id},
    data: {returnDate, delayFee}
  })
}

async function deleteRental(id:number) {
  return await prisma.rental.delete({
    where: {id}
  })
}

async function findOpenRentalsByGameId(gameId: number) {
  return await prisma.rental.findMany({
    where: {gameId, returnDate: null},
  })
}

export const rentalsRepository = {
  createRental,
  findRentalsOnly,
  findRentals,
  findRentalById,
  findRentalsByCustomerIdGameId,
  findRentalsByCustomerId,
  findRentalsByGameId,
  updateRental,
  findOpenRentalsByGameId,
  deleteRental,
}