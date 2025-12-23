const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware');

const authRoutes = require('../routes/authRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API running');
});

app.use(errorHandler);

module.exports = app;
