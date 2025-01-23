import { categoriesRepository } from "@/repositories/categories.repository"
import { gamesRepository } from "@/repositories/games.repository"
import { gamesService } from "@/services/games.service"
import { faker } from "@faker-js/faker/."
import { gamesFactory } from "../factories/games.factory"
import { categoryNotFoundError } from "@/errors/not-found.errors"
import { gameConflictError } from "@/errors/conflict.errors"

describe('Games service unit tests suite', () => {
  describe('Get games unit tests suite', () => {
    it(`should call findGames method and 
      not call findGamesLikeName when there is no name in query`,
      async () => {
        const findGames = jest.spyOn(gamesRepository, 'findGames')
        const findGamesLikeName = jest.spyOn(gamesRepository, 'findGamesLikeName')
        await gamesService.getGames('')
        expect(findGames).toHaveBeenCalledTimes(1);
        expect(findGamesLikeName).not.toHaveBeenCalled()
      })
    it('should call findGamesLikeName method when query name is sent', async () => {
      const findGamesLikeName = jest.spyOn(gamesRepository, 'findGamesLikeName')
      const name = faker.book.genre()
      await gamesService.getGames(name)
      expect(findGamesLikeName).toHaveBeenCalledTimes(1);
    })
  })
  describe('Post games unit tests suite', () => {
    it(`should throw an not found error when trying to create 
      a game with a category id that does not exists`, () => {
      const spy = jest.spyOn(categoriesRepository, 'findCategoryById').
        mockImplementationOnce((): any => null)
      const generatedGame = gamesFactory.generateGame(1);
      const response = gamesService.postGame(generatedGame);
      expect(spy).toHaveBeenCalledTimes(1)
      expect(response).rejects.toEqual(categoryNotFoundError())
    })
    it('should throw an error when trying to create an existing game', () => {
      jest.spyOn(categoriesRepository, 'findCategoryById').
        mockImplementationOnce((): any => {
          return {
            id: 1, name: faker.book.genre()
          }
        })
      const generatedGame = gamesFactory.generateGame(1);
      jest.spyOn(gamesRepository, 'findGameByName').
        mockImplementationOnce((): any => generatedGame);
      const spy = jest.spyOn(gamesRepository, 'createGame')
      const response = gamesService.postGame(generatedGame);
      expect(response).rejects.toEqual(gameConflictError());
      expect(spy).not.toHaveBeenCalled()
    })
    it(`should create a game when games still does not exists 
      and has an existing category id`, () => {
      jest.spyOn(categoriesRepository, 'findCategoryById').
        mockImplementationOnce((): any => {
          return {
            id: 1, name: faker.book.genre()
          }
        })
      const generatedGame = gamesFactory.generateGame(1);
      jest.spyOn(gamesRepository, 'findGameByName').
        mockImplementationOnce((): any => null);
      jest.spyOn(gamesRepository, 'createGame').mockImplementationOnce(():any => {
        return {id:1, ...generatedGame}
      })
      const response = gamesService.postGame(generatedGame);
      expect(response).resolves.toEqual({id: 1, ...generatedGame})
    })
  })
})