import * as controllerHelper from '../controllers/controllerHelper.js';
import * as clientRepository from '../repositories/clientsRepository.js';
import * as cakesRepository from '../repositories/cakesRepository.js';
import orderSchema from '../schemas/orderSchema.js';

async function validateNewOrder(request, response, next) {
  const newOrder = request.body;

  const validate = orderSchema.validate(newOrder, { abortEarly: false });
  const { error } = validate;
  if (error) {
    return controllerHelper.badRequestResponse(response);
  }

  try {
    const { rows: isClientRegistered } = await clientRepository.getClientById(
      newOrder.clientId
    );

    if (isClientRegistered.length === 0)
      return controllerHelper.notFoundResponse(response);

    //===============================================================================
    const { rows: isCakeRegistered } = await cakesRepository.getCakeById(newOrder.cakeId);

    if (isCakeRegistered.length === 0) return controllerHelper.notFoundResponse(response);

    next();
  } catch {
    response.status(500).send('erro ao validar newOrder');
  }
}

export default validateNewOrder;
