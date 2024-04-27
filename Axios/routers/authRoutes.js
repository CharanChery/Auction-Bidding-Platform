// routes/authRoutes.js
const express = require("express");
const app = express();
const router = express.Router();
const authController = require("../controllers/authController");
const session = require("express-session")

app.use(
    session({
      secret: "secret", // Change this to a random string
      resave: true,
      saveUninitialized: true,
    })
  );
// Logout route
router.get("/logout", authController.logout);

module.exports = router;
