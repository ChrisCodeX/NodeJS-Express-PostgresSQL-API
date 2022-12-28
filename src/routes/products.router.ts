import express from 'express';
import { ProductService } from '../services/products.service';
import { validatorHandler } from '../middleware/validator.handler';
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema';

/* Router */
export const router = express.Router();

const productService = new ProductService();

/* Products endpoints */

// Query parameters
// Uri: /products?size=xx
router.get('/',async (req, res, next)=>{
  try {
    const products = await productService.find()
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
});

// Get a parameter from request
router.get('/:idProduct',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const idProd = req.params.idProduct;
      const product = await productService.findOne(idProd)

      res.status(200).json(product);
    } catch (error) {
      if (error instanceof Error) {
        next(error)
      }
    }
  });

/* Post Methods */
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await productService.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      if (error instanceof Error) {
        next(error)
      }
    }
  })

/* Patch Methods */
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
      if (error instanceof Error) {
        next(error)
      }
    }
  })

/* Delete Methods */
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
      if (error instanceof Error) {
        next(error)
      }
    }
  })
