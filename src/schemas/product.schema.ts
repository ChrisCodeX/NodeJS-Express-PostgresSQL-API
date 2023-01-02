import joi from 'joi';

const id = joi.string().uuid();
const name = joi.string().min(3).max(20)
const price = joi.number().integer().min(10)
const description = joi.string().min(10)
const image = joi.string().uri()

/* Validations schemas - Client request */
export const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required()
})

export const updateProductSchema = joi.object({
  name: name,
  price: price,
  description: description,
  image: image
})

export const getProductSchema = joi.object({
  id: id.required()
})
