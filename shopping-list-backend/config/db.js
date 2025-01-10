const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Shopping List DB connected successfully!");
  } catch (err) {
    console.error("Unable to connect to the Shopping List DB:", err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
