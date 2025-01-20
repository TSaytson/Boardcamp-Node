import { conflictError, notFoundError } from "../utils/errorUtils";
import { categoriesRepository } from "../repositories/categories.repository";
import { gamesRepository } from "../repositories/games.repository"

async function getGames(name:string) {
  if (name)
    return await gamesRepository.findGamesLikeName(name);
  return await gamesRepository.findGames();
}

async function postGame({ name, categoryId, image, pricePerDay, stockTotal }) {
  const categoryFound = await categoriesRepository.findCategoryById(categoryId)
  if (!categoryFound)
    throw notFoundError('Category does not exists');
  const gameFound = await gamesRepository.findGameByName(name);
  if (gameFound) {
    throw conflictError('Game already registred');
  }
  return await gamesRepository.createGame({ name, categoryId, image, pricePerDay, stockTotal })
}

export const gamesService = {
  getGames,
  postGame
}