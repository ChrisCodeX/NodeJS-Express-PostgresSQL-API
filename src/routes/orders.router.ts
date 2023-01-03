import express from 'express'
import { validatorHandler } from '../middleware/validator.handler'
import { OrderService } from '../services/order.service'
import { getOrderSchema, createOrderSchema } from '../schemas/orders.schema'
import { getOrderProduct, addItemsSchema } from '../schemas/order-product.schema'

/* Router */
export const router = express.Router()

/* Order Service */
const orderService = new OrderService()

/* Order Endpoints */

/* Get Methods */
// Get all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await orderService.find()
    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
})

// Get a order by id
router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const order = await orderService.findOne(id)
      res.status(200).json(order)
    } catch (error) {
      next(error)
    }
  })

/* Post Methods */
// Create an order
router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newOrder = await orderService.create(body)
      res.status(200).json(newOrder)
    } catch (error) {
      next(error)
    }
  })

// Add items to order
router.post('/:id/products',
  validatorHandler(getOrderProduct, 'params'),
  validatorHandler(addItemsSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const body = req.body
      const newItem = await orderService.addItem(id, body)
      res.status(201).json(newItem)
    } catch (error) {
      next(error)
    }
  })

/* Patch Methods */
// Update an order
router.patch('/:id')
