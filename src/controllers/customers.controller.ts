import { Request, Response } from "express";
import { Customer } from "../schemas/customer.schema";
import { customersService } from "../services/customers.service";

export async function postCustomer(req: Request, res: Response) {
    const { name, phone, cpf, birthday }: Customer = req.body;
    await customersService.postCustomer({name, phone, cpf, birthday})
    res.status(201).send({message:
        `Cliente ${name} cadastrado`});
}

export async function getCustomers(req: Request, res: Response) {
    const cpf = req.query.cpf as string;
    const customers = await customersService.getCustomers(cpf);
    res.status(200).send(customers);

}

export async function getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    const customer = await customersService.getCustomerById(+id)
    res.status(200).send(customer);

}

export async function putCustomer(req: Request, res: Response) {
    const { name, cpf, phone, birthday }:Customer = req.body;
    const id = parseInt(req.params.id);
    await customersService.putCustomer({id, name, cpf, phone, birthday})
    res.status(200).send({message: 'Dados do cliente atualizados'});

}