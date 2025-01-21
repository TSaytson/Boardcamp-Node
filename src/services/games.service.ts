import { conflictError, notFoundError } from "../utils/errorUtils";
import { categoriesRepository } from "../repositories/categories.repository";
import { gamesRepository } from "../repositories/games.repository"
import { Game } from "../schemas/game.schema";

async function getGames(name:string) {
  if (name)
    return await gamesRepository.findGamesLikeName(name);
  return await gamesRepository.findGames();
}

async function postGame(game: Game) {
  const categoryFound = await categoriesRepository.findCategoryById(game.categoryId)
  if (!categoryFound)
    throw notFoundError('Category does not exists');
  const gameFound = await gamesRepository.findGameByName(game.name);
  if (gameFound) {
    throw conflictError('Game already registred');
  }
  return await gamesRepository.createGame(game)
}

export const gamesService = {
  getGames,
  postGame
}