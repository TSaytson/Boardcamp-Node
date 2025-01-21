import prisma from "@/config/database";
import { rentals } from "@prisma/client";

async function createRental(rental:Omit<rentals, 'id'>) {
  return await prisma.rentals.create({
    data: rental
  });
}

async function findRentalsOnly() {
  return await prisma.rentals.findMany()
}

async function findRentals() {
  return await prisma.rentals.findMany({
    include: {
      customers: {
        select: {
          id: true,
          name: true,
        }
      },
      games: {
        select: {
          id: true,
          name: true,
          categories: {
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
  return await prisma.rentals.findUnique({
    where: {id}
  })
}

async function findRentalsByCustomerIdGameId({ customerId, gameId }) {
  return await prisma.rentals.findMany({
    where: {customerId, gameId},
    include: {
      customers: {
        select: {
          id: true,
          name: true,
        }
      },
      games: {
        select: {
          id: true,
          name: true,
          categories: {
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
  return await prisma.rentals.findMany({
    where: {customerId},
    include: {
      customers: {
        select: {
          id: true,
          name: true,
        }
      },
      games: {
        select: {
          id: true,
          name: true,
          categories: {
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
  return await prisma.rentals.findMany({
    where: {gameId},
    include: {
      customers: {
        select: {
          id: true,
          name: true,
        }
      },
      games: {
        select: {
          id: true,
          name: true,
          categories: {
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
  return prisma.rentals.update({
    where: {id},
    data: {returnDate, delayFee}
  })
}

async function deleteRental(id:number) {
  return await prisma.rentals.delete({
    where: {id}
  })
}

async function findOpenRentalsByGameId(gameId: number) {
  return await prisma.rentals.findMany({
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