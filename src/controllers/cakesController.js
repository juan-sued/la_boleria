import * as controllerHelper from '../controllers/controllerHelper.js';
import * as cakesRepository from '../repositories/cakesRepository.js';

async function registerCake(request, response) {
  const { name, price, image, description } = request.body;

  try {
    await cakesRepository.insertCake({ name, image, price, description });

    return controllerHelper.okResponse(response);
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}

export default registerCake;
