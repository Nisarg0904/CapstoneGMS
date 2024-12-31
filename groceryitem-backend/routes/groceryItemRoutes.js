const express = require('express');
const {
  createGroceryItem,
  getAllGroceryItems,
  getGroceryItemById,
  updateGroceryItem,
  deleteGroceryItem,
} = require('../controllers/groceryItemController');

const router = express.Router();

router.post('/', createGroceryItem);
router.get('/', getAllGroceryItems);
router.get('/:id', getGroceryItemById);
router.put('/:id', updateGroceryItem);
router.delete('/:id', deleteGroceryItem);

module.exports = router;
