import express from 'express';
import { CustomerService } from '../services/customer.service';

/* Router */
const router = express.Router();

/* Customer Service */
const customerService = new CustomerService()

/* Get Methods */

