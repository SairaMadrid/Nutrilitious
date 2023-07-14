var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var jwt = require("jsonwebtoken");
require("dotenv").config();

let bcrypt = require("bcrypt");

const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    preference,
    cooking_skills,
    description,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO profiles (first_name, last_name, email, password, preference, cooking_skills, description) VALUES ("${first_name}", "${last_name}", "${email}", "${hash}", "${preference}", "${cooking_skills}", "${description}");`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//this is a dummy login, we will need to handle the hashed password in /register and compare it using bcrypt module
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const results = await db(
      `SELECT * FROM profiles WHERE email = "${email}";`
    );
    const user = results.data[0];
    if (user) {
      const id = user.id;

      let token = jwt.sign({ id }, supersecret);
      res.send({ message: "Login successful, your token is:", token });
      console.log(token);
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
