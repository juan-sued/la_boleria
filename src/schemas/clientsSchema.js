import joi from 'joi';

const clientSchema = joi.object({
  name: joi.string().trim().min(1),
  address: joi.string().trim().min(1),
  phone: joi
    .string()
    .pattern(/^[0-9]+$/)
    .trim()
    .min(10)
    .max(11)
});
export default clientSchema;
