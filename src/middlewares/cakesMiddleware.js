import cakeSchema from '../schemas/cakeSchema';

async function validateNewCake(request, response, next) {
  const newCake = request.body;

  const validate = cakeSchema.validate(newCake, { abortEarly: false });
  const { error } = validate;
  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  try {
    const QUERY_BASIC = 'SELECT * FROM ';

    const { rows: cakes } = await connection.query(QUERY_BASIC + 'cakes');

    const isCakeRegistered = cakes.some(cake => cake.name === newCake.name);

    if (isCakeRegistered) return response.sendStatus(409);

    next();
  } catch {
    response.status(500).send('erro ao validar newCake');
  }
}

export default validateNewCake;
