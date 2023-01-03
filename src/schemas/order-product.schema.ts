import Joi from 'joi';

const orderId = Joi.number().integer()
const productId = Joi.number().integer()
const amount = Joi.number().integer().min(1)

export const getOrderProduct = Joi.object({
  id: orderId.required()
})

export const addItemsSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required()
})