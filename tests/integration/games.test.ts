import app from "app";
import supertest from "supertest";
import { cleanDb } from "../helpers/cleanDb";
import { gamesFactory } from "../factories/games.factory";
import { categoriesFactory } from "../factories/categories.factory";
import prisma from "@/config/database";
import { categoryNotFoundError } from "@/errors/not-found.errors";
import { gameConflictError } from "@/errors/conflict.errors";

const api = supertest(app)

beforeEach(async () => await cleanDb())

afterAll(async () => await prisma.$disconnect())

describe('GET /api/games', () => {
  it('should return 200 status code and a list of games', async () => {
    const { id: categoryId } = await categoriesFactory.createCategory();
    await gamesFactory.createManyGames(categoryId);
    const createdGames = await prisma.game.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    });
    const response = await api.get('/api/games');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(createdGames)
  })
  it('should return status 200 and a list of games matching name', async () => {
    const { id: categoryId } = await categoriesFactory.createCategory();
    await gamesFactory.createManyGames(categoryId);
    const createdGames = await prisma.game.findMany();
    const response = await api.get(`/api/games?name=${createdGames[0].name}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        id: createdGames[0].id,
        name: createdGames[0].name,
        image: createdGames[0].image,
        stockTotal: createdGames[0].stockTotal,
        pricePerDay: createdGames[0].pricePerDay,
        categoryId
      })
    ]
    )
  })
})

describe('POST /games', () => {
  it('should return 422 status code when an invalid game format is sent', async () => {
    const createdCategorie = await categoriesFactory.createCategory();
    const generatedGame = gamesFactory.generateGame(createdCategorie.id);
    const { name, categoryId, pricePerDay, stockTotal } = generatedGame
    const response = await api.post('/api/games').send({ name, categoryId, pricePerDay, stockTotal })
    expect(response.status).toBe(422);
    expect(response.body).toEqual(expect.arrayContaining([expect.any(String)]))
  })
  it(`should return 404 status code when a game with an invalid category id is sent`, async () => {
    const generatedGame = gamesFactory.generateGame(1);
    generatedGame.categoryId = 2;
    const response = await api.post('/api/games').send(generatedGame);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: categoryNotFoundError().message })
  })
  it(`should return 409 status code when an existing game is sent`, async () => {
    const createdCategorie = await categoriesFactory.createCategory();
    const createdGame = await gamesFactory.createGame(createdCategorie.id);
    const response = await api.post('/api/games').send(createdGame)
    expect(response.status).toBe(409);
    expect(response.body).toEqual({message: gameConflictError().message})
  })
  it(`should return 201 status code and create a game when a 
    valid game with valid category id is sent`, async () => {
    const createdCategorie = await categoriesFactory.createCategory();
    const generatedGame = gamesFactory.generateGame(createdCategorie.id);
    const response = await api.post('/api/games').send(generatedGame);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: `Jogo ${generatedGame.name} adicionado` })
  })
})