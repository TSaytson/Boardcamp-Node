import { conflictError, notFoundError } from "../utils/errorUtils";
import { customersRepository } from "../repositories/customers.repository"
import { Customer, CustomerEntity } from "../schemas/customer.schema";

async function postCustomer(customer:Customer) {
  const customerFound = await customersRepository.findCustomerByCpf(customer.cpf);
  if (customerFound)
    throw conflictError('Cliente já cadastrado');
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
    throw notFoundError("Customer does not exists")
  return await customersRepository.updateCustomer({ id, name, phone, birthday });
}

export const customersService = {
  postCustomer,
  getCustomers,
  getCustomerById,
  putCustomer
}