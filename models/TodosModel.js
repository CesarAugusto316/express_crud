const { DataTypes } = require('sequelize');
const { sequelize } = require('../connectDB.js');


const TodoModel = sequelize.define('Todo', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

TodoModel.sync(); // creates the table if doesn't exist

module.exports = { TodoModel };
