const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const nodemail = require("./nodemail.js");

const app = express();
dotenv.config();
//app.set("view engine", "ejs");

// Initialize express-session middleware
app.use(
  session({
    secret: "secret", // Change this to a random string
    resave: true,
    saveUninitialized: true,
  })
);

var temp_mail;

const port = process.env.PORT || 1200;

// const username = process.env.MONGODB_USERNAME;
// const password = process.env.MONGODB_PASSWORD;
// const uri = process.env.URI;
// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost:27017/registration_project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

//Registration schema
const registration_Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Registration = mongoose.model("Registration", registration_Schema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
//app.use(express.static(__dirname, "/public/style.css"));

// app.get("/signin", (req, res) => {
//   res.sendFile(__dirname + "/public/signin.html");
// });

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Registration.findOne({ email: email });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!existingUser) {
      const RegistrationData = new Registration({
        name,
        email,
        password: hashedPassword,
      });
      await RegistrationData.save();
      req.session.user = email;
      res.redirect("/success");
    } else {
      res.redirect("/error");
      //alert('User already exists');
    }
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user_mail = await Registration.findOne({ email: email });
    if (!user_mail) {
      return res.redirect("/error");
    }
    const user_password = await bcrypt.compare(password, user_mail.password);
    // console.log(password);
    // console.log(user_mail.password);
    if (!user_password) {
      return res.redirect("/error");
    }
    req.session.user = email;
    // res.redirect("/success");
    res.redirect("/mainpage");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});

app.post("/forgotpass", async (req, res) => {
  try {
    const action = req.body.action;
    if (action === "verify") {
      const { email } = req.body;
      const user_mail = await Registration.findOne({ email: email });
      if (!user_mail) {
        return res.redirect("/error");
      } else {
        console.log("Verification mail has sent successfully!");
        temp_mail = email;
        nodemail.main(email);
      }
    } else if (action === "check") {
      const { otp_value } = req.body;
      console.log(otp_value);
      console.log(nodemail.otp);
      if (nodemail.otp == otp_value) {
        res.redirect("/newpassword");
      } else {
        res.redirect("/error");
      }
    } else {
      res.redirect("/error");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});

app.post("/newpassword", async (req, res) => {
  try {
    const { password, confirm_password } = req.body;
    const user_mail = await Registration.findOne({ email: temp_mail });
    if (user_mail) {
      if (password === confirm_password) {
        const user_password = await Registration.updateOne(
          { email: temp_mail },
          { password: password }
        );
        // if (user_password) {
        res.redirect("/signin");

        //console.log("Userpassword was updated successfully", user_password);
      } else {
        res.send("Password not matched");
      }
    } else {
      res.redirect("/error");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});

app.get("/success", (req, res) => {
  // Check if user is logged in before allowing access
  if (!req.session.user) {
    return res.redirect("/error");
  }
  res.sendFile(__dirname + "/public/success.html");
});
app.get("/mainpage", (req, res) => {
  res.sendFile(__dirname + "/nav bar/index.html");
});

app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/public/error.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/signin", (req, res) => {
  res.sendFile(__dirname + "/public/signin.html");
});
app.get("/forgotpass", (req, res) => {
  res.sendFile(__dirname + "/public/forgotpass.html");
});
app.get("/newpassword", (req, res) => {
  // const email = req.query.email;
  // res.render(__dirname + "/public/newpassword", { email: email });
  res.sendFile(__dirname + "/public/newpassword.html");
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out destroying session:", err);
    }
    res.redirect("/");
  });
});
app.listen(port, () => {
  console.log(`Server is running on the Port: ${port}`);
});
