/*
Filename: ComplexWebApp.js
Content: Complex Web Application
*/

// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initializing Express application
const app = express();

// Connecting to MongoDB database
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Creating a data model using Mongoose
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 0,
    max: 100
  }
});
const User = mongoose.model('User', UserSchema);

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Adding routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Starting the server
app.listen(3000, () => console.log('Server running on port 3000'));

// More complex and elaborate code can be added here, such as authentication, authorization,
// additional CRUD operations, validation, error handling, etc.

// ... [Additional code exceeding 200 lines] ...