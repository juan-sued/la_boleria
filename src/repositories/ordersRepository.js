import connection from '../databases/postgresSQL.js';

async function insertOrder({ clientId, cakeId, quantity, totalPrice, createdAt }) {
  return connection.query(
    `INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice", "createdAt") VALUES ($1, $2, $3, $4, $5)`,
    [clientId, cakeId, quantity, totalPrice, createdAt]
  );
}

export { insertOrder };
