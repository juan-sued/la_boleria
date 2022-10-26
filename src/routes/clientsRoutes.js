import { Router } from 'express';
import { registerClients, getOrdersByClient } from '../controllers/clientsController.js';
import validateNewClients from '../middlewares/clientsMiddleware.js';

const router = Router();

router.post('/clients', validateNewClients, registerClients);
router.get('/clients/:id/orders', getOrdersByClient);
export default router;
