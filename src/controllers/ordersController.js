import * as controllerHelper from './controllerHelper.js';
import * as ordersRepository from '../repositories/ordersRepository.js';
import dayjs from 'dayjs';
import connection from '../databases/postgresSQL.js';

export async function registerOrder(request, response) {
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

export async function getOrders(request, response) {
  const { date } = request.query;
  const { id } = request.params;

  const QUERY_BASIC = `SELECT orders.*, orders.id AS "orderId", clients.*,  clients.name AS "clientName", cakes.*, cakes.name AS "cakeName" FROM orders JOIN clients ON clients."id" = orders."clientId" JOIN cakes ON cakes."id" = orders."cakeId"`;
  const ordersJoin = [];
  console.log(!!date);
  try {
    if (!!date) {
      const { rows: orders } = await connection.query(
        QUERY_BASIC + ` WHERE orders."createdAt" = $1;`,
        [date]
      );

      if (orders.length === 0) return response.status(404).send(ordersJoin);

      for (let order of orders) {
        ordersJoin.push({
          client: {
            id: 1,
            name: order.clientName,
            address: order.address,
            phone: order.phone
          },
          cake: {
            id: 1,
            name: order.cakeName,
            price: order.price,
            description: order.description,
            image: order.image
          },
          orderId: 1,
          createdAt: order.createdAt,
          quantity: order.quantity,
          totalPrice: order.totalPrice
        });
      }

      return response.status(200).send(ordersJoin);
    } else if (!!id) {
      const { rows: orders } = await connection.query(
        QUERY_BASIC + ` WHERE orders.id = $1;`,
        [id]
      );
      console.log('aqui idasda', orders);

      if (orders.length === 0) return response.status(404).send(ordersJoin);

      for (let order of orders) {
        ordersJoin.push({
          client: {
            id: order.clientId,
            name: order.clientName,
            address: order.address,
            phone: order.phone
          },
          cake: {
            id: order.cakeId,
            name: order.cakeName,
            price: order.price,
            description: order.description,
            image: order.image
          },
          orderId: order.id,
          createdAt: order.createdAt,
          quantity: order.quantity,
          totalPrice: order.totalPrice
        });
      }

      return response.status(200).send(ordersJoin);
    }

    //====================================================================
    else {
      const { rows: allOrders } = await connection.query(QUERY_BASIC + ';');
      if (allOrders.length === 0) response.status(404).send(ordersJoin);
      console.log('aqui', allOrders);

      for (let order of allOrders) {
        ordersJoin.push({
          client: {
            id: 1,
            name: order.clientName,
            address: order.address,
            phone: order.phone
          },
          cake: {
            id: 1,
            name: order.cakeName,
            price: order.price,
            description: order.description,
            image: order.image
          },
          orderId: 1,
          createdAt: order.createdAt,
          quantity: order.quantity,
          totalPrice: order.totalPrice
        });
      }

      return response.status(200).send(ordersJoin);
    }
  } catch {
    return response.sendStatus(500);
  }
}
