import prisma from "../config/database"

async function findCategories(){
  return await prisma.categories.findMany();
}

async function createCategorie(name: string){
  return await prisma.categories.create({
    data: {name}
  })
}

async function findCategoryById(id){
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