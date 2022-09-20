const { config } = require('dotenv');
const { Sequelize } = require('sequelize');


config({
  path: './.env'
});


const sequelize = new Sequelize((() => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.DB_URL_PRO;
  }
  return process.env.DB_URL_DEV;
})(), {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true
    }
  }
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
