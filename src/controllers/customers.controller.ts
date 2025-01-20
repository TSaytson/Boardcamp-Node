import { Request, Response } from "express";
import dayjs from 'dayjs';

export async function postCustomer(req: Request, res: Response) {
    const { name, phone, cpf, birthday } = req.body;
        res.status(201).send(
            `Cliente ${res.locals.customer.name} cadastrado`);

}

export async function getCustomers(req: Request, res: Response) {

        res.status(200).send();

}

export async function getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
        res.status(200).send();

}

export async function putCustomer(req: Request, res: Response) {
    const { name, cpf, phone, birthday } = req.body;
    const { id } = req.params;
        
        res.status(200).send('Dados do cliente atualizados');

}