import { Router } from "express";
import customersRoutes from './customers.routes'
import gamesRoutes from './games.routes.js'
import rentalsRoutes from './rentals.routes.js'

const router = Router();

router.use([customersRoutes])

export default router