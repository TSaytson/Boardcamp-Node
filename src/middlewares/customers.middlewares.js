import {customerSchema} from '../schemas/customer.schemas.js';
import {connectionDB} from '../database/db.js';

export async function validateCustomer(req, res, next){
    const validation = customerSchema.validate(
        req.body, {abortEarly:false}
    );
    if (validation.error){
        const errors = validation.error.details.map(
            (detail) => detail.message
        );
        console.log(errors);
        return res.status(400).send(errors);
    }
    
    const {name, phone, cpf, birthday} = req.body;
    try {
        const customerFound = (await connectionDB.query
            (
                'SELECT * FROM customers WHERE cpf=$1;',
                [cpf]
            )).rowCount;
        if (customerFound && req.method !== 'PUT')
            return res.status(409).send('Cliente já cadastrado');
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    }

    res.locals.customer = {
        name,
        phone,
        cpf,
        birthday
    }
    next();
}