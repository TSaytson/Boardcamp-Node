import { Router } from "express";
import {customerRouter} from './customers.routes'
import { categoriesRouter } from "./categories.routes";
import { gamesRouter } from "./games.routes";

const router = Router();

router.use([categoriesRouter, gamesRouter])

export default router