const express = require("express");
const {
  createShoppingListItem,
  getItemsInShoppingList,
  updateShoppingListItem,
  deleteShoppingListItem,
} = require("../controllers/shoppingListItemController");

const router = express.Router();

// Create a shopping list item
router.post("/", createShoppingListItem);

// Get all items in a specific shopping list
router.get("/:shopping_list_id", getItemsInShoppingList);

// Update a shopping list item
router.put("/:list_item_id", updateShoppingListItem);

// Delete a shopping list item
router.delete("/:list_item_id", deleteShoppingListItem);

module.exports = router;
