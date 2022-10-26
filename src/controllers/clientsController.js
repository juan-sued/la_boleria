import * as controllerHelper from './controllerHelper.js';
import * as clientsRepository from '../repositories/clientsRepository.js';
import connection from '../databases/postgresSQL.js';
export async function registerClients(request, response) {
  const { name, address, phone } = request.body;

  try {
    await clientsRepository.insertClients({ name, address, phone });

    return controllerHelper.okResponse(response);
  } catch {
    return controllerHelper.serverErrorResponse(response);
  }
}

export async function getOrdersByClient(request, response) {
  const { id } = request.params;

  try {
    const { rows: orders } = await connection.query(
      `SELECT orders.*, cakes.name AS cakeName FROM orders JOIN cakes ON orders."cakeId" = cakes.id WHERE orders."clientId" = $1;`,
      [id]
    );

    if (orders.length === 0) return response.sendStatus(404);

    return response.status(200).send(orders);
  } catch {
    return response.sendStatus(500);
  }
}
