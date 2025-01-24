import { customersRepository } from "../repositories/customers.repository"
import { Customer, CustomerEntity } from "../schemas/customer.schema";
import { customerConflictError } from "../errors/conflict.errors";
import { customerNotFoundError } from "../errors/not-found.errors";

async function postCustomer(customer:Customer) {
  const customerFound = await customersRepository.findCustomerByCpf(customer.cpf);
  if (customerFound)
    throw customerConflictError();
  return await customersRepository.createCustomer(customer)
}

async function getCustomers(cpf:string) {
  if (cpf)
    return await customersRepository.findCustomersLikeCpf(cpf);
  return await customersRepository.findCustomers();
}

async function getCustomerById(id:number) {
  return await customersRepository.findCustomerById(id)
}

async function putCustomer({ id, name, phone, birthday }:CustomerEntity) {
  const customerFound = await customersRepository.findCustomerById(id);
  if (!customerFound)
    throw customerNotFoundError()
  return await customersRepository.updateCustomer({ id, name, phone, birthday });
}

export const customersService = {
  postCustomer,
  getCustomers,
  getCustomerById,
  putCustomer
}