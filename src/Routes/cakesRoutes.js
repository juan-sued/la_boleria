import { Router } from 'express';
import validateNewCake from '../middlewares/cakesMiddleware';

const router = Router();

router.post('/cakes', validateNewCake);
