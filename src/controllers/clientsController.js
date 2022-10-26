import * as controllerHelper from './controllerHelper.js';
import * as clientsRepository from '../repositories/clientsRepository.js';

async function registerClients(request, response) {
  const { name, address, phone } = request.body;

  try {
    await clientsRepository.insertClients({ name, address, phone });

    return controllerHelper.okResponse(response);
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}

export default registerClients;
