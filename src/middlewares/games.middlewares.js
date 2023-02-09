import { gameSchema } from "../schemas/game.schemas.js";
import { connectionDB } from "../database/db.js";

export async function validateGame(req, res, next) {
    const validation = gameSchema.validate(
        req.body, {abortEarly:false}
    )

    if (validation.error) {
        const errors = validation.error.details.map(
            (detail) => detail.message
        );
        console.log(errors);
        return res.status(400).send(errors);
    } 

    const { name,
        image,
        stockTotal,
        pricePerDay } = req.body;

    try {
        const gameFound = (await connectionDB.query
            ('SELECT * FROM games WHERE name=$1',
                [name])).rowCount;
        if (gameFound) {
            return res.status(409).send('Jogo já cadastrado');
        }
    } catch (error) {
        console.log(error);
        res.status(422).send(error.message);
    }

    res.locals.game = {
        name,
        image,
        stockTotal,
        pricePerDay
    }

    next();
        
}