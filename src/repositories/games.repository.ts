import { games } from "@prisma/client"
import prisma from "../config/database"
import { Game } from "schemas/game.schema"

async function findGames() {
  return await prisma.games.findMany({
    include: {
      categories: {
        select: {
          name: true
        }
      }
    }
  })
}

async function findGameById(id: number) {
  return await prisma.games.findFirst({
    where: { id }
  })
}

async function findGameByName(name: string) {
  return await prisma.games.findFirst({
    where: { name }
  })
}

async function findGamesLikeName(name: string) {
  return await prisma.games.findMany({
    where: {
      name: {
        startsWith: name,
        mode: 'insensitive'
      }
    },
    include: {
      categories: {
        select: {
          name: true
        }
      }
    }
  })
}

async function createGame(game: Game) {
  return await prisma.games.create({
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