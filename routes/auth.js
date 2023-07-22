var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var jwt = require("jsonwebtoken");
require("dotenv").config();
let userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");

let bcrypt = require("bcrypt");

const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    preferences,
    cooking_skills,
    description,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO profiles (first_name, last_name, email, password, preferences, cooking_skills, description) VALUES ("${first_name}", "${last_name}", "${email}", "${hash}", "${preferences}", "${cooking_skills}", "${description}");`
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const results = await db(
      `SELECT * FROM profiles WHERE email = "${email}";`
    );
    const user = results.data[0];
    if (user) {
      const id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

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

router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
  try {
    const results = await db(`SELECT * FROM profiles WHERE id = ${req.id}`);
    // console.log(results.data[0].username);
    const user = results.data[0];
    if (user) {
      res.send(user);
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

/* PATCH user's profile info / the preferences, cooking skills, and description*/
router.patch("/profile", userShouldBeLoggedIn, async function (req, res, next) {
  const { id } = req;
  const { preferences, cooking_skills, description } = req.body;
  try {
    //first checking if the profile/user exists
    const results = await db(`SELECT * FROM profiles WHERE id = ${req.id}`);
    const user = results.data[0];
    if (!user) {
      throw new Error("User does not exist");
    }

    // create an array to store the changes that need to be made for the sql requests
    const updatedProfileInfo = [];
    if (preferences) updatedProfileInfo.push(`preferences = "${preferences}"`);
    if (cooking_skills)
      updatedProfileInfo.push(`cooking_skills = "${cooking_skills}"`);
    if (description) updatedProfileInfo.push(`description = "${description}"`);
    // just in case npthing has been sent/changed
    if (updatedProfileInfo.length === 0) {
      return res.status(400).send({ message: "No fields to update" });
    }
    // send the request to sql where there have been changes made and update user profile in the database
    // using join to switch from an array to a string that is comma-separated
    await db(
      `UPDATE profiles SET ${updatedProfileInfo.join(", ")} WHERE id = ${id}`
    );
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
