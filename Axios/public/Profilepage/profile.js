const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Mongoose schema for your user profile
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String
});

// Create a Mongoose model for your user profile
const User = mongoose.model('User', userSchema);

// Define a route for your profile page
app.get('/profile', async (req, res) => {
  // Find the user profile in the database
  const user = await User.findOne({ email: req.user.email });

  // Render the profile page with the user profile data
  res.render('profile', { user: user });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});