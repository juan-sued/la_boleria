import connection from '../databases/postgresSQL.js';

async function insertOrder({ clientId, cakeId, quantity, totalPrice, createdAt }) {
  return connection.query(
    `INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5)`,
    [clientId, cakeId, quantity, totalPrice, createdAt]
  );
}
async function getOrders() {
  return connection.query(
    `SELECT id AS "orderId", "clientId" as client, "cakeId" as cake,"createdAt", quantity, "totalPrice", "isDelivered" FROM orders`
  );
}
export { insertOrder, getOrders };
