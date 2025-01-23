import { conflictError } from "../utils/errorUtils";
import { categoriesRepository } from "../repositories/categories.repository";
import { Category } from "../schemas/categories.schema";
import { categoryConflictError } from "@/errors/conflict.errors";

async function getCategories(){
  return await categoriesRepository.findCategories();
}

async function postCategorie(category: Category){
  const categoryFound = await categoriesRepository.findCategoryByName(category.name);
  if (categoryFound)
      throw categoryConflictError();
  return await categoriesRepository.createCategorie(category);
}

export const categoriesService = {
  getCategories,
  postCategorie
}