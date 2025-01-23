import app from "app";
import supertest from "supertest";
import { cleanDb } from "../helpers/cleanDb";
import { customersFactory } from "../factories/customers.factory";
import prisma from "@/config/database";

const api = supertest(app)

beforeEach(async () => await cleanDb())

afterAll(async () => await prisma.$disconnect())

describe('/GET customers', () => {
  it('Should return 200 status code and a list of customers', async () => {
    await customersFactory.createManyCustomers()
    const response = await api.get('/customers')
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          birthday: expect.any(Date),
          cpf: expect.any(String),
          id: expect.any(Number),
          name: expect.any(String),
          phone: expect.any(String),
        })
      ])
    )
  })
})