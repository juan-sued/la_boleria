import { Router } from 'express';
import registerOrder from '../controllers/ordersController.js';

import validateNewOrder from '../middlewares/ordersMiddleware.js';

const router = Router();

router.post('/orders', validateNewOrder, registerOrder);

export default router;
