const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
const ShoppingList = require("./models/shoppingListModel");
const shoppingListRoutes = require("./routes/shoppingListRoutes");

const app = express();
app.use(bodyParser.json());

// Use the shopping list routes
app.use("/api/shopping-lists", shoppingListRoutes);

// Connect to the database
connectDB();

// Sync models to the database
(async () => {
  try {
    await ShoppingList.sync({ alter: true }); // Use `force: true` to drop and recreate the table
    console.log("ShoppingList table synchronized successfully!");
  } catch (error) {
    console.error("Error synchronizing the ShoppingList table:", error.message);
  }
})();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Shopping List Service running on port ${PORT}`);
});
