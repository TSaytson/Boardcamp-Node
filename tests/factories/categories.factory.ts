import prisma from "@/config/database";
import { faker } from "@faker-js/faker/.";

function generateCategory(){
  return {
    name: faker.book.genre()
  }
}

function createCategory(){
  return prisma.category.create({
    data: generateCategory()
  })
}

function createManyCategories(){
  return prisma.category.createMany({
    data: [
      generateCategory(),
      generateCategory(),
      generateCategory()
    ]
  })
}

export const categoriesFactory = {
  createCategory,
  createManyCategories,
  generateCategory
}