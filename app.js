const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./connectDB.js');
const { routerTodo } = require('./routers/routerTodos.js');
const { routerAuth } = require('./routers/routerAuth.js');


const app = express();
const PORT = process.env.PORT || 3_000;
connectDb();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api/v1/todos', routerTodo);
app.use('/api/v1/auth', routerAuth);

/**
 * 
 * @description default errorHandler
 */
app.use((err, req, res, next) => {
  if (err) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    return res.status(status).json({
      status,
      message
    });
  } else {
    next();
  }
});

// skip when testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server ⚡] running on port ${PORT}.`);
  });
}

module.exports = { app };
