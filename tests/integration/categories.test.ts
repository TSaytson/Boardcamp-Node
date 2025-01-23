import supertest from "supertest";
import app from "app";
import { cleanDb } from "../helpers/cleanDb";
import { categoriesFactory } from "../factories/categories.factory";
import prisma from "@/config/database";

const api = supertest(app)

beforeEach(async () => await cleanDb())

afterAll(async () =>  await prisma.$disconnect())

describe('GET /categories', () => {
  it('should return 200 status code and a list of categories', async () => {
    await categoriesFactory.createManyCategories()
    const response = await api.get('/categories')
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String)
        })
      ])
    )
  })
  it('should return 200 status code and an empty array', async () => {
    const response = await api.get('/categories')
    expect(response.status).toBe(200);
    expect(response.body).toEqual([])
  })
})

describe('POST /categories', () => {
  it('should respond with 201 status code and create category in the database', async () => {
    const generatedCategory = categoriesFactory.generateCategory();
    const response = await api.post('/categories').send(generatedCategory);
    const createdCategory = await prisma.categories.findUnique({
      where: {name: generatedCategory.name}
    })
    
    expect(response.status).toBe(201);
    expect(createdCategory).toEqual({
      id: expect.any(Number),
      name: generatedCategory.name
    })
  })
  it('should respond with 409 status when sending and already registred category', async () => {
    const createdCategory = await categoriesFactory.createCategory();
    const response = await api.post('/categories').send(createdCategory);
    expect(response.status).toBe(409);
  })
})