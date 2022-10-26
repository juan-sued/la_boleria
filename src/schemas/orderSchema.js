import joi from 'joi';

const orderSchema = joi.object({
  clientId: joi.number().integer().required().positive(),
  cakeId: joi.number().integer().required().positive(),
  quantity: joi.number().integer().required().positive().max(5),
  totalPrice: joi.number().positive().required()
});
export default orderSchema;
