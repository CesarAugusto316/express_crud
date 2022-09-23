const { config } = require('dotenv');
const { Sequelize } = require('sequelize');


config();

const sequelize = new Sequelize(process.env.DB_URL, {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true
    }
  },
  logging: false
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('[DB ⚡] connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { connectDb, sequelize };
