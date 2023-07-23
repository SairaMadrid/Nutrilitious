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
//POSTMAN TEST: TBC - to test when spoonacular is running

//where to get token: http://localhost:4000/api/auth/login
// use post body and then type in the email and password and then auth tab postman and then bearer token for th token
// front end token - inspect, application and local storage
router.post("/", userShouldBeLoggedIn, async (req, res) => {
  const { name, image, api_id } = req.body;

  try {
    await db(
      `INSERT INTO favourites (name, image, profiles_id, api_id) VALUES ('${name}', '${image}', ${req.id}, ${api_id} )`
    );

    // doesn't need join - only need to work with favourites DB

    const result = await db(
      `SELECT * FROM favourites WHERE profiles_id  = ${req.id};`
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
// POST MAN URL: localhost4000/api/favourites
// user is logged in so it knows the id - so don't need to mention in url
//POSTMAN TEST: TBC - to be tested when spoontacular is running

router.delete("/", userShouldBeLoggedIn, async (req, res, next) => {
  const { api_id } = req.body;
  try {
    await db(
      `DELETE FROM favourites WHERE profiles_id = ${req.id} AND api_id = ${api_id};`
    );
    const result = await db(
      `SELECT * FROM favourites WHERE profiles_id  = ${req.id};`
    );
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ALL FAVOURITES
// POST MAN URL: localhost4000/api/favourites
//POSTMAN TEST: TBC - to be tested when spoontacular is running
router.get("/", userShouldBeLoggedIn, async (req, res, next) => {
  try {
    const result = await db(
      `SELECT * FROM favourites WHERE profiles_id  = ${req.id};`
    );
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
// create new components called favourites? Or is there profile component?
*/
module.exports = router;
