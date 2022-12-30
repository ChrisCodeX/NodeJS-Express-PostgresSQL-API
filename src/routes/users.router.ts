import express from 'express';
import { UsersService } from '../services/users.service';
import { validatorHandler } from '../middleware/validator.handler';
import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas/user.schema';

/* Router */
export const router = express.Router();

/* User Service */
const usersService = new UsersService()

/* Get Methods */
// Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await usersService.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

// Get a user by id
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.findOne(id)
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  });

/* Post Methods */
// Create a new user
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await usersService.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error)
    }
  })

/* Patch Methods */
// Update a user
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const user = await usersService.update(id, body)
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  })

/* Delete Methods */
// Delete a user
router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await usersService.delete(id);
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  })
