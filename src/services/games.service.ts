import { categoriesRepository } from "../repositories/categories.repository";
import { gamesRepository } from "../repositories/games.repository"
import { Game } from "../schemas/game.schema";
import { categoryNotFoundError } from "../errors/not-found.errors";
import { gameConflictError } from "../errors/conflict.errors";

async function getGames(name:string) {
  if (name)
    return await gamesRepository.findGamesLikeName(name);
  return await gamesRepository.findGames();
}

async function postGame(game: Game) {
  const categoryFound = await categoriesRepository.findCategoryById(game.categoryId)
  if (!categoryFound)
    throw categoryNotFoundError();
  const gameFound = await gamesRepository.findGameByName(game.name);
  if (gameFound) {
    throw gameConflictError();
  }
  return await gamesRepository.createGame(game)
}

export const gamesService = {
  getGames,
  postGame
}