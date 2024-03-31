const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 1200;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


mongoose.connect('mongodb://localhost:27017/registration_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully!');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if unable to connect to MongoDB
});
