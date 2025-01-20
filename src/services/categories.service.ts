import { categoriesRepository } from "../repositories/categories.repository";

async function getCategories(){
  return await categoriesRepository.findCategories();
}

async function postCategorie(name:string){
  const categorieFound = await categoriesRepository.findCategoryByName(name);
  if (categorieFound)
      throw ({message: 'Categoria já cadastrada', status:409});
  return await categoriesRepository.createCategorie(name);
}

export const categoriesService = {
  getCategories,
  postCategorie
}