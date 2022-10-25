import connection from '../databases/postgresSQL.js';

async function getAllClients() {
  return connection.query('SELECT * FROM clients;');
}

async function insertClients({ name, address, phone }) {
  return connection.query(
    `INSERT INTO clients (name, address, phone) VALUES
    ('${name}',
    '${address}',
    '${phone}')`
  );
}

export { getAllClients, insertClients };
