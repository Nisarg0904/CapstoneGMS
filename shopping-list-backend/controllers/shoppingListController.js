const ShoppingList = require("../models/shoppingListModel");

// Create a new shopping list
exports.createShoppingList = async (req, res) => {
  try {
    const { name, user_id } = req.body;
    const shoppingList = await ShoppingList.create({ name, user_id });
    res.status(201).json(shoppingList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all shopping lists
exports.getAllShoppingLists = async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.findAll();
    res.status(200).json(shoppingLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific shopping list by ID
exports.getShoppingListById = async (req, res) => {
  try {
    const { list_id } = req.params;
    const shoppingList = await ShoppingList.findByPk(list_id);

    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a shopping list
exports.updateShoppingList = async (req, res) => {
  try {
    const { list_id } = req.params;
    const { name, status } = req.body;

    const shoppingList = await ShoppingList.findByPk(list_id);

    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    shoppingList.name = name || shoppingList.name;
    shoppingList.status = status || shoppingList.status;

    await shoppingList.save();

    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a shopping list
exports.deleteShoppingList = async (req, res) => {
  try {
    const { list_id } = req.params;

    const shoppingList = await ShoppingList.findByPk(list_id);

    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    await shoppingList.destroy();
    res.status(200).json({ message: "Shopping list deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
