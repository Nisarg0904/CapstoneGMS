const express = require("express");
const bodyParser = require("body-parser");
const shoppingListItemRoutes = require("./routes/shoppingListItemRoutes");

const app = express();
app.use(bodyParser.json());

// Define the base route for shopping list items
app.use("/api/shopping-list-items", shoppingListItemRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Shopping List Item Service running on port ${PORT}`);
});
