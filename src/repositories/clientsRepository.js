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

async function getClientById(clientId) {
  return connection.query('SELECT * FROM clients WHERE id = $1;', [clientId]);
}

export { getAllClients, insertClients, getClientById };
