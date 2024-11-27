const { DataTypes } = require("sequelize");
const userDB = require("../config/user_db");

const User = userDB.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shoppingActivity: {
      type: DataTypes.ENUM("daily", "weekly", "biweekly", "monthly"),
      defaultValue: "daily",
    },
    dietPreference: {
      type: DataTypes.ENUM(
        "none",
        "vegan",
        "vegetarian",
        "pescatarian",
        "keto"
      ),
      defaultValue: "none",
    },
    cookingForPeople: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 10,
      },
      defaultValue: 1,
    },
    cuisinePreference: {
      type: DataTypes.ENUM(
        "none",
        "indian",
        "korean",
        "chinese",
        "italian",
        "mexican"
      ),
      defaultValue: "none",
    },
  },
  {
    timestamps: true,
  }
);

const bcrypt = require("bcrypt");

// Hash password before creating a new user
User.beforeCreate(async (user) => {
    console.log("Hashing password before create");
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Hash password before updating a user
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = User;
