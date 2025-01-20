import { getCategories, postCategorie } from "../controllers/categories.controller";
import { Router } from "express";
import { validateBody } from "../middlewares/validation.middleware";
import { categorieSchema } from "../schemas/categories.schema";

export const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', validateBody(categorieSchema), postCategorie)