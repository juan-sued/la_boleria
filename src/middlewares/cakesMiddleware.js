import cakeSchema from '../schemas/cakeSchema.js';
import connection from '../databases/postgresSQL.js';

async function validateNewCake(request, response, next) {
  const newCake = request.body;

  const validate = cakeSchema.validate(newCake, { abortEarly: false });
  const { error } = validate;
  if (error) {
    const details = error.details;

    if (details[0].path[0] === 'image') {
      return response.sendStatus(420);
    }

    return response.sendStatus(400);
  }

  try {
    const QUERY_BASIC = 'SELECT * FROM ';
    console.log(1);
    const { rows: cakes } = await connection.query(QUERY_BASIC + 'cakes;');

    const isCakeRegistered = cakes.some(cake => cake.name === newCake.name);

    if (isCakeRegistered) return response.sendStatus(409);

    next();
  } catch {
    response.status(500).send('erro ao validar newCake');
  }
}

export default validateNewCake;
