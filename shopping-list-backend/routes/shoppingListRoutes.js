const express = require("express");
const {
  createShoppingList,
  getAllShoppingLists,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
} = require("../controllers/shoppingListController");

const router = express.Router();

// 1. Create a new shopping list
router.post("/", createShoppingList);

// 2. Get all shopping lists (optionally filter by user or status)
router.get("/", getAllShoppingLists);

// 3. Get a specific shopping list by ID
router.get("/:list_id", getShoppingListById);

// 4. Update a shopping list (e.g., change name or status)
router.put("/:list_id", updateShoppingList);

// 5. Delete a shopping list
router.delete("/:list_id", deleteShoppingList);

module.exports = router;
