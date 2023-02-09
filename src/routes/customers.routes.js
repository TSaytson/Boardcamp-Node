import { Router } from "express";
import { validateCustomer } from "../middlewares/customers.middlewares.js";
import {getCustomers, getCustomerById, postCustomer, putCustomer} from '../controllers/customers.controllers.js';

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post('/customers', validateCustomer, postCustomer);
router.put('/customers/:id', validateCustomer, putCustomer);

export default router;