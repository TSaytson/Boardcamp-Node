import prisma from "../config/database";
import { Customer, CustomerEntity } from "../schemas/customer.schema";

async function findCustomers(){
  return await prisma.customers.findMany();
}

async function findCustomersLikeCpf(cpf:string){
  return await prisma.customers.findMany({
    where: {
      cpf: {
        startsWith: cpf,
        mode: 'insensitive'
      }
    }
  })
}

async function findCustomerById(id:number){
  return await prisma.customers.findUnique({
    where: {id}
  })
}

async function findCustomerByCpf(cpf:string){
  return await prisma.customers.findFirst({
    where: {cpf}
  })
}

async function createCustomer(customer:Customer){
  return await prisma.customers.create({
    data: {...customer, birthday: new Date(customer.birthday)}
  })
}

async function updateCustomer(customer:Omit<CustomerEntity, 'cpf'>){
  return await prisma.customers.update({
    data: {...customer, birthday: new Date(customer.birthday)},
    where: {id: customer.id}
  })
}

export const customersRepository = {
  findCustomers,
  findCustomersLikeCpf,
  findCustomerByCpf,
  findCustomerById,
  createCustomer,
  updateCustomer
}