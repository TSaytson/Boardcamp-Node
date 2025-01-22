import { categoriesRepository } from "@/repositories/categories.repository";
import { categoriesFactory } from "../factories/categories.factory"
import { categoriesService } from "@/services/categories.service";
import { faker } from "@faker-js/faker/.";
import { conflictError } from "@/utils/errorUtils";

describe('categories service unit tests suite', () => {
  describe('get categories unit tests suite', () => {
    it('should return an empty categories array', async () => {
      const spy = jest.spyOn(categoriesRepository, "findCategories").
        mockImplementationOnce((): any => [{
          id: faker.number.int({ min: 1, max: 2 }),
          name: faker.book.genre()
        }])
      const result = await categoriesService.getCategories()
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String)
        })
      ]))
    })
  })
  describe('post categories unit tests suite', () => {
    it('should throw an error when category already exists', async () => {
      const generatedCategory = categoriesFactory.generateCategory();
      const spy = jest.spyOn(categoriesRepository, 'findCategoryByName').
        mockImplementationOnce((): any => generatedCategory)
      const promise = categoriesService.postCategorie(generatedCategory)
      expect(spy).toHaveBeenCalled();
      expect(promise).rejects.toEqual(conflictError('Category already registred'))
    })
  })
})