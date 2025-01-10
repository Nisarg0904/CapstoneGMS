const ShoppingListItem = require("../models/shoppingListItemModel");

// Create a shopping list item
exports.createShoppingListItem = async (req, res) => {
  try {
    const { shopping_list_id, item_id, quantity, expected_price } = req.body;

    const newItem = await ShoppingListItem.create({
      shopping_list_id,
      item_id,
      quantity,
      expected_price,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all items in a shopping list
exports.getItemsInShoppingList = async (req, res) => {
  try {
    const { shopping_list_id } = req.params;

    const items = await ShoppingListItem.findAll({
      where: { shopping_list_id },
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a shopping list item
exports.updateShoppingListItem = async (req, res) => {
  try {
    const { list_item_id } = req.params;
    const { quantity, expected_price, actual_price } = req.body;

    const updatedItem = await ShoppingListItem.update(
      { quantity, expected_price, actual_price },
      { where: { list_item_id }, returning: true }
    );

    res.status(200).json(updatedItem[1][0]); // returning updated object
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a shopping list item
exports.deleteShoppingListItem = async (req, res) => {
  try {
    const { list_item_id } = req.params;

    await ShoppingListItem.destroy({
      where: { list_item_id },
    });

    res
      .status(200)
      .json({ message: "Shopping list item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
