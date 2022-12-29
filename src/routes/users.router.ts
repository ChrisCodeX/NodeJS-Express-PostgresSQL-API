import express from 'express';
import { UsersService } from '../services/users.service';
import { validatorHandler } from '../middleware/validator.handler';
import { createUserSchema } from '../schemas/user.schema';

export const router = express.Router();

const usersService = new UsersService()

/* Get Methods */
router.get('/', async (req, res, next) => {
  try {
    const users = await usersService.find()
    res.status(200).json(users)
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
})

router.get('/:id', (req,res)=>{
  try {
    const {id} = req.params;
    const user = usersService.findOne(id)
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
});

/* Post Methods */
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await usersService.create(body);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(error)
      }
    }
  })

/* Patch Methods */
router.patch('/:id', (req, res) => {
  try {
    const {id} = req.params
    const body = req.body
    const user = usersService.update(id, body)
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
})

/* Delete Methods */
router.delete('/:id', (req, res) => {
  try {
    const {id} = req.params
    const user = usersService.delete(id);
    res.json(user)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
})
