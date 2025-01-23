import prisma from '@/config/database'
import {faker} from '@faker-js/faker'
import dayjs from 'dayjs'

function generateCustomerSchema(){
  return {
    name: faker.helpers.uniqueArray(faker.person.fullName, 1)[0],
    phone: faker.string.numeric({length: {min: 10, max: 11}}),
    cpf: faker.string.numeric(11),
    birthday: dayjs(faker.date.birthdate()).format('YYYY-MM-DD')
  }
}

function generateCustomer(){
  return {
    name: faker.helpers.uniqueArray(faker.person.fullName, 1)[0],
    phone: faker.string.numeric({length: {min: 10, max: 11}}),
    cpf: faker.string.numeric(11),
    birthday: faker.date.birthdate()
  }
}

function createCustomer(){
  return prisma.customers.create({
    data: generateCustomer()
  })
}

function createManyCustomers(){
  return prisma.customers.createMany({
    data: [
      generateCustomer(),
      generateCustomer(),
      generateCustomer()
    ]
  })
}

export const customersFactory = {
  generateCustomer,
  createCustomer,
  createManyCustomers
}