import express from 'express';
import { CategoryService } from '../services/category.service';
import { validatorHandler } from '../middleware/validator.handler';
import { createCategorySchema, updateCategorySchema, getCategorySchema } from '../schemas/category.schema';

/* Router */
export const router = express.Router()

/* Category service */
const categoryService = new CategoryService

/* Get Methods */
// Get all categories
router.get('/', async (req, res, next)=>{
  try {
    const categories = await categoryService.find()
    res.status(200).json(categories);
  } catch (error) {
    next(error)
  }
});

// Get a category by id
router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async(req, res, next) => {
    try {
      const {id} = req.params
      const category = await categoryService.findOne(id)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  })

/* Post methods */
// Create a new category
router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await categoryService.create(body)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  })

/* Patch methods */
// Update categories data
router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const body = req.body
      const category = await categoryService.update(id, body)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  })

  /* Delete methods */
  // Delete a category
  router.patch('/:id',
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
      try {
        const {id} = req.params
        const user = await categoryService.delete(id)
        res.status(202).json(user)
      } catch (error) {
        next(error)
      }
    })