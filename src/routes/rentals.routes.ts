import { Router } from "express";
import {postRent, getRentals, deleteRent, postRentReturn} from '../controllers/rentals.controller';
import { validateBody, validateParams, validateQuery } from "../middlewares/validation.middleware";
import { rentalSchema } from "../schemas/rental.schema";
import { idParamsSchema } from "../schemas/idParams.schema";
import { idQuerySchema } from "../schemas/rentalQuery.schema";

export const rentalsRouter = Router();

rentalsRouter.get('/rentals', validateQuery(idQuerySchema), getRentals);
rentalsRouter.post('/rentals', validateBody(rentalSchema), postRent);
rentalsRouter.post('/rentals/:id/return', validateParams(idParamsSchema), postRentReturn);
rentalsRouter.delete('/rentals/:id', validateParams(idParamsSchema), deleteRent);