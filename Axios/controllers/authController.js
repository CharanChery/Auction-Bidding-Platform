// controllers/authController.js\
const session = require("express-session");


const logout = (req, res) => {
    // Clear the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Error logging out");
      } else {
        // Redirect the user to the login page or send a success response
        res.redirect("/login"); // Redirect to login page
      }
    });
  };
  
  module.exports = {
    logout,
  };
  