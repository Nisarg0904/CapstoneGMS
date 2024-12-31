const GroceryItem = require('../models/grocery_item');
const { validateUser, validateItem } = require('../utils/apiHelper');

// Create a grocery item
async function createGroceryItem(req, res) {
  const { user_id, item_id, purchased_price, purchased_on, expiry_date, available_quantity, quantity } = req.body;

  try {
    // Validate user_id and item_id
    await validateUser(user_id);
    await validateItem(item_id);

    // Create grocery item
    const groceryItem = await GroceryItem.create({
      user_id,
      item_id,
      purchased_price,
      purchased_on,
      expiry_date,
      available_quantity,
      quantity,
    });

    res.status(201).json(groceryItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all grocery items
async function getAllGroceryItems(req, res) {
  try {
    const groceryItems = await GroceryItem.findAll();
    res.status(200).json(groceryItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grocery items' });
  }
}

// Get a grocery item by ID
async function getGroceryItemById(req, res) {
  const { id } = req.params;

  try {
    const groceryItem = await GroceryItem.findByPk(id);
    if (!groceryItem) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }

    res.status(200).json(groceryItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grocery item' });
  }
}

// Update a grocery item
async function updateGroceryItem(req, res) {
  const { id } = req.params;
  const { user_id, item_id, purchased_price, purchased_on, expiry_date, available_quantity, quantity } = req.body;

  try {
    // Validate user_id and item_id
    if (user_id) await validateUser(user_id);
    if (item_id) await validateItem(item_id);

    // Update the grocery item
    const updated = await GroceryItem.update(
      { user_id, item_id, purchased_price, purchased_on, expiry_date, available_quantity, quantity },
      { where: { grocery_item_id: id } }
    );

    if (!updated[0]) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }

    res.status(200).json({ message: 'Grocery item updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a grocery item
async function deleteGroceryItem(req, res) {
  const { id } = req.params;

  try {
    const deleted = await GroceryItem.destroy({ where: { grocery_item_id: id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }

    res.status(200).json({ message: 'Grocery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete grocery item' });
  }
}

module.exports = {
  createGroceryItem,
  getAllGroceryItems,
  getGroceryItemById,
  updateGroceryItem,
  deleteGroceryItem,
};
