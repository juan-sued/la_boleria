import connection from '../databases/postgresSQL.js';

async function getAllCakes() {
  return connection.query('SELECT * FROM cakes;');
}

async function insertCake({ name, image, price, description }) {
  return connection.query(
    `INSERT INTO cakes (name, image, price, description) VALUES
    ('${name}',
    '${image}',
    ${price},
    '${description}')`
  );
}

export { getAllCakes, insertCake };
