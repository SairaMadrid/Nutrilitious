require("dotenv").config();
var express = require("express");
var router = express.Router();
const axios = require("axios");
let userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");
const db = require("../model/helper");

///not sure is this creating a issue?
//const API_KEY = process.env.API_KEY;

// in app.js it lists /api/favourites - so you don't need to write favourites anymore in the postman request - delete will still require /id

// POST (ADD TO FAVOURITES)
// POST MAN URL: localhost4000/api/favourites
//POSTMAN TEST: NOT WORKING (Preferences issue on user.js)
router.post("/", userShouldBeLoggedIn, async (req, res) => {
  const { name, image } = req.body;

  try {
    await db(
      `INSERT INTO favourites (name, image, profiles_id) VALUES ("${name}", "${image}", ${req.id})`
    );

    // doesn't need join but not sure what is required instead?

    const result = await db(
      `SELECT favourites ON profiles.id = favourites.profiles_id WHERE profiles.id  = ${req.id};`
    );
    res.send(result.data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/* to test in postman
  {
   "name": "test",
   "image": "test",
   "profiles_id": 1
    }
*/

/*
// code from group brainstorm 

 router.post("/favourites", userShouldBeLoggedIn, async (req, res) => {
  const {name, image} = req.body;

  try {
await db(`INSERT INTO favourites (name, image, profiles_id) VALUES ("${name}", "${image}", ${req.id})`);

const result = await db(`SELECT profiles.first_name, favourites.name FROM profiles LEFT JOIN favourites ON profiles.id = favourites.profiles_id WHERE profiles.id  = ${req.id};`);
res.send(result.data);
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}); 

*/

//DELETE
// POST MAN URL: localhost4000/api/favourites/1
//POSTMAN TEST: TBC

router.delete("/:id", userShouldBeLoggedIn, async (req, res, next) => {
  try {
    await db(`DELETE FROM favourites WHERE id = ${req.params.id}`);
    const result = await db("SELECT * FROM favourites ORDER BY id ASC");
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ALL FAVOURITES
// POST MAN URL: localhost4000/api/favourites
//POSTMAN TEST: WORKING
router.get("/", async (req, res, next) => {
  try {
    const result = await db(`SELECT * FROM favourites;`);
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
// create new components called favourites? Or is there profile component?
*/
module.exports = router;
