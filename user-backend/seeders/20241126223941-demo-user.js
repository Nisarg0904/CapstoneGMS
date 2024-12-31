"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        username: "john_doe",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: await require("bcrypt").hash("password123", 10), // Hash password before seeding
        shoppingActivity: "weekly",
        dietPreference: "vegetarian",
        cookingForPeople: 2,
        cuisinePreference: "italian",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "jane_smith",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        password: await require("bcrypt").hash("password123", 10),
        shoppingActivity: "monthly",
        dietPreference: "vegan",
        cookingForPeople: 4,
        cuisinePreference: "mexican",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
