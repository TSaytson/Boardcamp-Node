import { Router } from "express";
import {getGames, postGame } from "../controllers/games.controllers.js";
import { validateGame } from "../middlewares/games.middlewares.js";

const router = Router();

router.get('/games', getGames);
router.post('/games', validateGame, postGame);

export default router;