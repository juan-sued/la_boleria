import joi from 'joi';

const cakeSchema = joi.object({
  name: joi.string().trim().required().min(2),
  price: joi.number().double().positive(),
  image: joi.string().uri().trim().required(),
  description: joi.string().trim()
});
export default cakeSchema;
