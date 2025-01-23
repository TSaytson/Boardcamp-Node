import { categoriesRepository } from "@/repositories/categories.repository";
import { categoriesFactory } from "../factories/categories.factory"
import { categoriesService } from "@/services/categories.service";
import { faker } from "@faker-js/faker/.";
import { categoryConflictError } from "@/errors/conflict.errors";

describe('categories service unit tests suite', () => {
  describe('get categories unit tests suite', () => {
    it('should return a categories array', () => {
      const spy = jest.spyOn(categoriesRepository, "findCategories").
        mockImplementationOnce((): any => [{
          id: faker.number.int({ min: 1, max: 2 }),
          name: faker.book.genre()
        }])
      const result = categoriesService.getCategories()
      expect(spy).toHaveBeenCalled();
      expect(result).resolves.toEqual(expect.arrayContaining([
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
      jest.spyOn(categoriesRepository, 'findCategoryByName').
        mockImplementationOnce((): any => generatedCategory)
      const spy = jest.spyOn(categoriesRepository, 'createCategorie')
      const promise = categoriesService.postCategorie(generatedCategory)
      expect(categoriesRepository.findCategoryByName).toHaveBeenCalledWith(generatedCategory.name);
      expect(spy).not.toHaveBeenCalled();
      expect(promise).rejects.toEqual(categoryConflictError())
    })
    it('should try to create category when it does not exists', async () => {
      const generatedCategory = categoriesFactory.generateCategory();
      jest.spyOn(categoriesRepository, 'findCategoryByName').
        mockResolvedValue(null)
      const spy = jest.spyOn(categoriesRepository, 'createCategorie')
      const promise = categoriesService.postCategorie(generatedCategory)
      expect(categoriesRepository.findCategoryByName).toHaveBeenCalledWith(generatedCategory.name);
      await expect(promise).resolves.toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: generatedCategory.name
      }))
      expect(spy).toHaveBeenCalledWith(generatedCategory);
    })
  })
})