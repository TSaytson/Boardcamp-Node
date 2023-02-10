import { connectionDB } from "../database/db.js";
import dayjs from 'dayjs';

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customer;
    try {
        await connectionDB.query(`INSERT INTO customers 
        (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4)`, [
            name,
            phone,
            cpf,
            birthday
        ]);
        return res.status(201).send(
            `Cliente ${res.locals.customer.name} cadastrado`);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

export async function getCustomers(req, res) {
    try {
        const customers = (await connectionDB.query(`SELECT * FROM
        customers;`)).rows;
        customers.map((customer) => {
            customer.birthday =
                (dayjs(customer.birthday).toISOString()).substring(0, 10);
        });
        return res.status(200).send(customers);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;
    try {
        const customerFound = (await connectionDB.query
            (
                'SELECT * FROM customers WHERE id=$1;',
                [id]
            )).rows[0];
        if (customerFound){
            customerFound.birthday =
                (dayjs(customerFound.birthday).toISOString()).substring(0, 10);
            return res.status(200).send(customerFound);
        }
        else
            return res.status(404).send('Cliente não encontrado');
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function putCustomer(req, res) {
    const { name, cpf, phone, birthday } = res.locals.customer;
    const { id } = req.params;
    try {
        await connectionDB.query(`UPDATE customers SET name=$1,
        phone=$2, birthday=$3 WHERE id=$4`,
            [name, phone, birthday, id]);
        res.status(200).send('Dados do cliente atualizados');
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}