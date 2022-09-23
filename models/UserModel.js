const { DataTypes } = require('sequelize');
const { sequelize } = require('../connectDB.js');


const UserModel = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

UserModel.sync({ alter: true }); // creates the table if doesn't exist and alters if needed

module.exports = { UserModel };
