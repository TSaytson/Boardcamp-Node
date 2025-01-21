import { Category } from "../schemas/categories.schema";
import prisma from "../config/database"

async function findCategories(){
  return await prisma.categories.findMany();
}

async function createCategorie(category:Category){
  return await prisma.categories.create({
    data: category
  })
}

async function findCategoryById(id:number){
  return await prisma.categories.findFirst({
    where: {id}
  })
}

async function findCategoryByName(name:string){
  return await prisma.categories.findFirst({
    where: {name}
  })
}

export const categoriesRepository = {
  findCategories,
  createCategorie,
  findCategoryById,
  findCategoryByName
}