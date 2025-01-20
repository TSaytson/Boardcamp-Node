import { Router } from "express";
import {getGames, postGame } from "../controllers/games.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { gameSchema } from "../schemas/game.schema";

const router = Router();

router.get('/games', getGames);
router.post('/games', validateBody(gameSchema), postGame);

export default router;