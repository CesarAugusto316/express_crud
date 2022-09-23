const { DataTypes } = require('sequelize');
const { sequelize } = require('../connectDB.js');


const TodoModel = sequelize.define('Todo', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

TodoModel.sync({ alter: true }); // creates the table if doesn't exist and alters if needed

module.exports = { TodoModel };
