import { connectionDB } from "../database/db.js";

export async function getGames(req, res) {
    try {
        const games = (await connectionDB.query
            (`SELECT games.* FROM games`)).rows;
        res.status(200).send(games);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}
export async function postGame(req, res) {
    try {
        await connectionDB.query
            (`
            INSERT INTO games
            (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);`,
                [res.locals.game.name,
                res.locals.game.image,
                res.locals.game.stockTotal,
                    res.locals.game.pricePerDay]);
        return res.status(201).send(`Jogo ${res.locals.game.name} adicionado`);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}