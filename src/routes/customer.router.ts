import express from 'express';
import { CustomerService } from '../services/customer.service';
import { validatorHandler } from '../middleware/validator.handler';
import { createCustomerSchema, getCustomerSchema, updateCustomerSchema } from '../schemas/customer.schema';

/* Router */
const router = express.Router();

/* Customer Service */
const customerService = new CustomerService()

/* Get Methods */
router.get('/',
  async (req, res, next)=>{
    return new Promise<unknown>((resolve, reject) => {
      try {
        const customers = customerService.find()
        res.status(200).json(customers)
        resolve(customers)
      } catch (error) {
        reject(error)
      }
    })
})
