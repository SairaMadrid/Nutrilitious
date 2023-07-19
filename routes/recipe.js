require("dotenv").config();
var express = require("express");
var router = express.Router();
const axios = require("axios");
let userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");
const db = require("../model/helper");

const API_KEY = process.env.API_KEY;

// GET recipe titles by ingredients
router.get("/findByIngredients", async function (req, res, next) {
  const ingredients = req.query.ingredients;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=9`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error, "Failed to fetch the recipe");
  }
});

//GET recipe instructions by id
router.get("/", async function (req, res, next) {
  const id = req.query.id;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ingredients
router.get("/ingredients", async function (req, res, next) {
  const ingredient = req.query.query;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&addChildren=false&number=1`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );

    const data = response.data.results[0]; //selecting one result from the array
    const imageURL = `https://spoonacular.com/cdn/ingredients_100x100/${data.image}`; //the image path from the results array
    const ingredientWithImg = {
      ...data,
      imageURL: imageURL, //construct a new key
    };
    res.send(ingredientWithImg);
    //res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//To implement filtering?
router.get("/complexSearch", async function (req, res, next) {
  const { query, diet, cuisine, intolerances } = req.query;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${diet}&cuisine=${cuisine}&intolerances=${intolerances}`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET images by ID
router.get("/images", async function (req, res, next) {
  const { id } = req.query;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    res.send({ imageURL: response.data.image });
  } catch (error) {
    res.status(500).send(error);
  }
});

 router.post("/add-favourites", userShouldBeLoggedIn, async (req, res) => {
  const {name, image, profiles_id} = req.body;
  try {
await db(`INSERT INTO favourites (name, image, profiles_id) VALUES ("${name}", "${image}", ${profiles_id})`);

const result = await db(`SELECT profiles.first_name, favourites.name FROM profiles LEFT JOIN favourites ON profiles.id = favourites.profiles_id WHERE profiles.id  = ${req.id};`);
res.send(result.data);
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}); 

module.exports = router;
