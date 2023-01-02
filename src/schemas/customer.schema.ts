import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);