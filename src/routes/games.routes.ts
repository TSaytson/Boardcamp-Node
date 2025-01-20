import { Router } from "express";
import {getGames, postGame } from "../controllers/games.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { gameSchema } from "../schemas/game.schema";

export const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateBody(gameSchema), postGame);