import { conflictError } from "../utils/errorUtils";
import { categoriesRepository } from "../repositories/categories.repository";
import { Category } from "../schemas/categories.schema";

async function getCategories(){
  return await categoriesRepository.findCategories();
}

async function postCategorie(category: Category){
  const categorieFound = await categoriesRepository.findCategoryByName(category.name);
  if (categorieFound)
      throw conflictError("Category already registred");
  return await categoriesRepository.createCategorie(category);
}

export const categoriesService = {
  getCategories,
  postCategorie
}