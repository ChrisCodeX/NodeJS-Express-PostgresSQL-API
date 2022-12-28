import express from 'express';
import { UsersService } from '../services/users.service';

export const router = express.Router();

const usersService = new UsersService()

/* Get Methods */
router.get('/', async (req, res) => {
  try {
    const users = await usersService.find()
    res.json(users)
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        message: error.message
      })
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
      res.json({
        message: error.message
      })
    }
  }
});

/* Post Methods */
router.post('/', (req, res) => {
  try {
    const body = req.body;
    const user = usersService.create(body);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message
      })
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
