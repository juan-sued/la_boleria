import { Router } from 'express';
import registerClients from '../controllers/clientsController.js';
import validateNewClients from '../middlewares/clientsMiddleware.js';

const router = Router();

router.post('/clients', validateNewClients, registerClients);

export default router;
