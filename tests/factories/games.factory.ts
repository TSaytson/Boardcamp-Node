import prisma from "@/config/database";
import { faker } from "@faker-js/faker/.";

function generateGame(categoryId: number) {
  return {
    name: faker.book.title(),
    image: faker.internet.url(),
    stockTotal: faker.number.int({max: 10}),
    pricePerDay: faker.number.int({min: 1000, max: 10000}),
    categoryId
  }
}

function createGame(categoryId: number){
  return prisma.games.create({
    data: generateGame(categoryId)
  })
}

function createManyGames(categoryId: number){
  return prisma.games.createMany({
    data: [
      generateGame(categoryId),
      generateGame(categoryId),
      generateGame(categoryId)
    ]
  })
}

export const gamesFactory = {
  createGame,
  createManyGames,
  generateGame
}