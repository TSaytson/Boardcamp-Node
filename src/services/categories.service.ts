import { conflictError } from "../utils/errorUtils";
import { categoriesRepository } from "../repositories/categories.repository";

async function getCategories(){
  return await categoriesRepository.findCategories();
}

async function postCategorie(name:string){
  const categorieFound = await categoriesRepository.findCategoryByName(name);
  if (categorieFound)
      throw conflictError("Category already registred");
  return await categoriesRepository.createCategorie(name);
}

export const categoriesService = {
  getCategories,
  postCategorie
}