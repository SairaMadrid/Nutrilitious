var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var createError = require("http-errors");

/* GET all info from users / from the profiles db */
router.get("/", async function (req, res, next) {
  try {
    const result = await db(
      `SELECT first_name, favourites, preferences FROM profiles;`
    );
    res.send(result.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* GET specific user/profile */
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const results = await db(
      `SELECT first_name, favourites, preferences FROM profiles WHERE id = ${id};`
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* POST new user/profile */
router.post("/", async function (req, res, next) {
  try {
    await db(
      `INSERT INTO profiles (first_name, last_name, email, password, favourites, preferences) VALUES ('${req.body.first_name}','${req.body.last_name}', '${req.body.email}', '${req.body.password}', '${req.body.favourites}', '${req.body.preferences}');`
    );

    const response = await db(
      `SELECT first_name, favourites, preferences FROM profiles;`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* DELETE users/profile */
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    await db(`DELETE FROM profiles WHERE id = ${id};`);
    // Fetch the updated list/table
    const results = await db(
      `SELECT first_name, favourites, preferences FROM profiles;`
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* PUT users/profile */
router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await db(
      `UPDATE profiles SET first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', email = '${req.body.email}', password = '${req.body.password}', favourites = '${req.body.favourites}', preferences = '${req.body.preferences}' WHERE id = ${id};`
    );
    // Fetch the updated user/profile
    const response = await db(
      `SELECT first_name, favourites, preferences FROM profiles;`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
