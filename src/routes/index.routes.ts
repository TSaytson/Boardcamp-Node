import { Router } from "express";
import {customerRouter} from './customers.routes'
import { categoriesRouter } from "./categories.routes";

const router = Router();

router.use([categoriesRouter])

export default router