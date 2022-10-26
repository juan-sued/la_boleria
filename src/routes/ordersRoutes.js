import { Router } from 'express';
import { registerOrder, getOrders } from '../controllers/ordersController.js';

import validateNewOrder from '../middlewares/ordersMiddleware.js';

const router = Router();

router.post('/orders', validateNewOrder, registerOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrders);
export default router;
