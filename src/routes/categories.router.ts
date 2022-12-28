import express from 'express';

export const router = express.Router()

/* Get more than 1 parameter */
router.get('/:categoryId/products/:productId', (req, res)=>{
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId
  });
});
