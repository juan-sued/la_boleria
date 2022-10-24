import connection from '../databases/postgres.js';

async function registerCake(request, response) {
  const { name, price, image, description } = request.body.newCake;

  try {
    await connection.query(
      `INSERT INTO games (name, image, price, description) VALUES
      ('${name}',
      '${image}',
      ${price},
      ${description})`
    );

    return response.sendStatus(201);
  } catch {
    return response.status(500).send('erro ao adicionar cake');
  }
}

export default registerCake;
