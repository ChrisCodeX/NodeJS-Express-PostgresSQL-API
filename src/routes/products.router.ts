import express from 'express';
import { ProductService } from '../services/products.service';
import { validatorHandler } from '../middleware/validator.handler';
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema';

/* Router */
export const router = express.Router();

/* Product Service */
const productService = new ProductService();

/* Products Endpoints */

/* Get Methods */
// Get all products
router.get('/', async (req, res, next)=>{
  try {
    const products = await productService.find()
    res.status(200).json(products);
  } catch (error) {
    next(error)
  }
});

// Get idProduct from request
router.get('/:idProduct',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const idProd = req.params.idProduct;
      const product = await productService.findOne(idProd)

      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  });

/* Post Methods */
// Create new product
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await productService.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  })

/* Patch Methods */
// Update a product
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      console.log(body)
      const { id } = req.params
      const product = await productService.update(id, body)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  })

/* Delete Methods */
// Delete a product
router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await productService.delete(id);
      res.status(200).json({
        id: product
      });
    } catch (error) {
      next(error)
    }
  })
