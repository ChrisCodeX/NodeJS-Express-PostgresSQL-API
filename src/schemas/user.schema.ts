import Joi from 'joi';

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8)
const role = Joi.string()

/* Validations Types */
export interface createUser {
  email: string
  password: string
  role: string
}

export type updateUser = Partial<createUser>

export interface getUser {
  id: number
}

/* Validations Schemas - Client Request */
export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
})

export const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role
})

export const getUserSchema = Joi.object({
  id: id.required()
})