import express from 'express';
import { CustomerService } from '../services/customer.service';
import { validatorHandler } from '../middleware/validator.handler';
import { createCustomerSchema, getCustomerSchema, updateCustomerSchema } from '../schemas/customer.schema';

/* Router */
export const router = express.Router();

/* Customer Service */
const customerService = new CustomerService()

/* Get Methods */
// Get all customers
router.get('/', async (req, res, next) => {
  try {
    const customers = await customerService.find()
    res.status(200).json(customers)
  } catch (error) {
    next(error)
  }
})

// Get a customer by id
router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const customer = await customerService.findOne(id)
      res.status(200).json(customer)
    } catch (error) {
      next(error)
    }
  })

/* Post Methods */
// Create a customer
router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCustomer = await customerService.create(body)
      res.status(201).json(newCustomer)
    } catch (error) {
      next(error)
    }
  })

