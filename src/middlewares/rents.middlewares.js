import { connectionDB } from "../database/db.js";
import {rentSchema} from '../schemas/rent.schemas.js'
import dayjs from 'dayjs';

export async function validateRent(req, res, next){
    const validation = rentSchema.validate(
        req.body, {abortEarly:false}
    )

    if (validation.error){
        const errors = validation.error.details.
        map((detail) => detail.message);
        console.log(errors);
        return res.status(400).send(errors);
    }

    const {customerId, gameId, daysRented} = req.body;

    try {
        const customerFound = (await connectionDB.query(`SELECT * FROM
         customers WHERE id=$1;`, [customerId])).rowCount;
        const gameFound = (await connectionDB.query(`SELECT * FROM 
        games WHERE id=$1;`, [gameId])).rows[0];
        if (!customerFound)
            return res.status(400).send('Cliente não encontrado');
        if (!gameFound)
            return res.status(400).send('Jogo não encontrado');
        if (gameFound.stockTotal < 1)
            return res.status(400).send('Jogo esgotado');
    } catch( error){
        console.log(error);
        return res.status(500).send(error.message);
    }

    res.locals.rent = {
        customerId,
        gameId,
        rentDate: dayjs(Date.now()).format('YYYY-MM-DD'),
        daysRented,
        returnDate: null,
        delayFee: null        
    }
    next();
}

export async function verifyRent(req, res, next){
    const {id} = req.params;

    try{
        const rentFound = (await connectionDB.query(`SELECT * FROM 
        rentals WHERE id=$1;`, [id])).rows[0];
        if (!rentFound)
            return res.status(404).send('Aluguel não encontrado');
        if (rentFound.returnDate)
            return res.status(400).send('Jogo já devolvido');
        rentFound.returnDate = dayjs(Date.now()).toDate();
        console.log(
            rentFound.returnDate.diff(rentFound.rentDate, 'day')
        )
        res.locals.rent = rentFound;
    } catch (error){
        console.log(error);
        res.status(500).send(error.message);
    }
    next();
}