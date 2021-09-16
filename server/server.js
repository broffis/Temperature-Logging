require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/locations', require('./routes/location'));
app.use('/api/fridges', require('./routes/fridge'));
app.use('/api/temp', require('./routes/tempLog'));
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Temperature Log API....'})
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));