import { connectionDB } from "../database/db.js";

export async function postRent(req, res){
    const {
        customerId, 
        gameId, 
        rentDate, 
        daysRented, 
        returnDate, 
        delayFee
    } = res.locals.rent;

    try {
        const game = (await connectionDB.query(`SELECT 
        "pricePerDay", "stockTotal" FROM games 
        WHERE id=$1;`, [gameId])).rows[0];
        const originalPrice = 
        (daysRented) * (game.pricePerDay);

        await connectionDB.query(`INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", 
        "returnDate", "originalPrice", "delayFee") 
        VALUES ($1, $2, $3, $4, $5, $6, $7);`, [
            customerId,
            gameId,
            rentDate,
            daysRented,
            returnDate,
            originalPrice,
            delayFee
        ]);
        console.log(game);
        await connectionDB.query(`UPDATE games 
        SET "stockTotal"=$1 WHERE id=$2;`, 
        [--game.stockTotal, gameId]);
        return res.status(201).send(
            `Aluguel de ${rentDate} cadastrado`);
    } catch(error){
        console.log(error);
        return res.status(500).send(error.message);
    }
    
}

export async function getRents(req, res){
    const {customerId, gameId} = req.query;
    let rents;
    try{
        if (gameId && customerId){
            rents = (await connectionDB.query(`SELECT * FROM 
            rentals WHERE "customerId"=$1 AND "gameId"=$2;`,
            [customerId, gameId])).rows;
        } 
        else if (customerId){
            rents = (await connectionDB.query(`SELECT * FROM 
            rentals WHERE "customerId"=$1;`, [customerId])).rows;
        }
        else if (gameId){
            rents = (await connectionDB.query(`SELECT * FROM 
            rentals WHERE "gameId"=$1;`, [gameId])).rows;
        } 
        else{
            rents = (await connectionDB.query(`SELECT * FROM 
            rentals;`)).rows;
        }
        for (let i = 0; i < rents.length; i++){
            rents[i].customer = (await connectionDB.query(`
            SELECT id, name FROM customers WHERE id=$1;`, 
            [rents[i].customerId])).rows[0];
        }

        for (let i = 0; i < rents.length; i++){
            rents[i].game = (await connectionDB.query(`SELECT 
            games.id, games.name
            FROM 
            games  
            WHERE id=$1;`, [rents[i].gameId])).rows[0];
        }
        res.status(200).send(rents);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function postRentReturn(req, res){
    const {rent} = res.locals;
    try{
 
    }
    catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}
export async function deleteRent(req, res){
    const {id} = req.params;

    try {
        await connectionDB.query(`DELETE FROM rentals 
        WHERE id=$1;`, [id]);
        return res.sendStatus(200);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}