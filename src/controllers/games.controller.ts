import { Request, Response } from "express";
import { gamesService } from "../services/games.service";
import { Category } from "../schemas/categories.schema";

export async function getGames(req: Request, res: Response) {
    const { name } = req.query as Category;
    const games = await gamesService.getGames(name);
    res.status(200).send(games);
}

export async function postGame(req: Request, res: Response) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    await gamesService.postGame({ name, image, stockTotal, categoryId, pricePerDay })
    res.status(201).send({ message: `Jogo ${name} adicionado` });
}