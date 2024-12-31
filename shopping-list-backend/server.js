const express = require("express");
const bodyParser = require("body-parser");
const shoppingListRoutes = require("./routes/shoppingListRoutes");

const app = express();
app.use(bodyParser.json());

// Use the shopping list routes
app.use("/api/shopping-lists", shoppingListRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Shopping List Service running on port ${PORT}`);
});
