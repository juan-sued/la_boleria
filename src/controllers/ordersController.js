import * as controllerHelper from './controllerHelper.js';
import * as ordersRepository from '../repositories/ordersRepository.js';
import dayjs from 'dayjs';

async function registerOrder(request, response) {
  const { clientId, cakeId, quantity, totalPrice } = request.body;
  const createdAt = dayjs(Date.now()).format('YYYY-MM-DD HH:mm');
  try {
    await ordersRepository.insertOrder({
      clientId,
      cakeId,
      quantity,
      totalPrice,
      createdAt
    });

    return controllerHelper.createdResponse(response);
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}

export default registerOrder;
