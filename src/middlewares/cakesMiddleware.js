import cakeSchema from '../schemas/cakeSchema.js';
import * as controllerHelper from '../controllers/controllerHelper.js';
import * as cakesRepository from '../repositories/cakesRepository.js';
async function validateNewCake(request, response, next) {
  const newCake = request.body;

  const validate = cakeSchema.validate(newCake, { abortEarly: false });
  const { error } = validate;
  if (error) {
    const details = error.details;

    if (details[0].path[0] === 'image') {
      return controllerHelper.unprocessableEntityResponse(response);
    }

    return controllerHelper.badRequestResponse(response);
  }

  try {
    const { rows: cakes } = await cakesRepository.getAllCakes();

    const isCakeRegistered = cakes.some(cake => cake.name === newCake.name);

    if (isCakeRegistered) return controllerHelper.conflictResponse(response);

    next();
  } catch {
    response.status(500).send('erro ao validar newCake');
  }
}

export default validateNewCake;
