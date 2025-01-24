import { Router } from "express";
import {customerRouter} from './customers.routes'
import { categoriesRouter } from "./categories.routes";
import { gamesRouter } from "./games.routes";
import { rentalsRouter } from "./rentals.routes";

const router = Router();

router.use('/api', [categoriesRouter, gamesRouter, customerRouter, rentalsRouter])

export default router