import { Category } from "../schemas/categories.schema";
import prisma from "../config/database"

async function findCategories(){
  return await prisma.category.findMany();
}

async function createCategorie(category:Category){
  return await prisma.category.create({
    data: category
  })
}

async function findCategoryById(id:number){
  return await prisma.category.findFirst({
    where: {id}
  })
}

async function findCategoryByName(name:string){
  return await prisma.category.findFirst({
    where: {name}
  })
}

export const categoriesRepository = {
  findCategories,
  createCategorie,
  findCategoryById,
  findCategoryByName
}