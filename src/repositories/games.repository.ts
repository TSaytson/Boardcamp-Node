import prisma from "../config/database"
import { Game } from "schemas/game.schema"

async function findGames() {
  return await prisma.game.findMany({
    include: {
      category: {
        select: {
          name: true
        }
      }
    }
  })
}

async function findGameById(id: number) {
  return await prisma.game.findFirst({
    where: { id }
  })
}

async function findGameByName(name: string) {
  return await prisma.game.findFirst({
    where: { name }
  })
}

async function findGamesLikeName(name: string) {
  return await prisma.game.findMany({
    where: {
      name: {
        startsWith: name,
        mode: 'insensitive'
      }
    },
    include: {
      category: {
        select: {
          name: true
        }
      }
    }
  })
}

async function createGame(game: Game) {
  return await prisma.game.create({
    data: game
  })
}

export const gamesRepository = {
  findGames,
  findGameById,
  findGameByName,
  findGamesLikeName,
  createGame,
}