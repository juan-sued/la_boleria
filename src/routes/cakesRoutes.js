import { Router } from 'express';
import registerCake from '../controllers/cakesController.js';
import validateNewCake from '../middlewares/cakesMiddleware.js';

const router = Router();

router.post('/cakes', validateNewCake, registerCake);

export default router;
