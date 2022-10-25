import * as controllerHelper from '../controllers/controllerHelper.js';

import clientSchema from '../schemas/clientsSchema.js';

function validateNewClients(request, response, next) {
  const newClient = request.body;

  const validate = clientSchema.validate(newClient, { abortEarly: false });
  const { error } = validate;

  if (error) {
    return controllerHelper.badRequestResponse(response);
  }

  next();
}

export default validateNewClients;
