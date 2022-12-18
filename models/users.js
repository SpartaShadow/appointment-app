const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Creating Users Table
const Users = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Users;
