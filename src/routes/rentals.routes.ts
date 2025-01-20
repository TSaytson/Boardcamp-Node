import { Router } from "express";
import {postRent, getRents, deleteRent, postRentReturn} from '../controllers/rentals.controller';

const router = Router();

router.get('/rentals', getRents);
router.post('/rentals', validateRent, postRent);
router.post('/rentals/:id/return', verifyRent, postRentReturn);
router.delete('/rentals/:id', verifyRent, deleteRent);

export default router;