var express = require('express');
var router = express.Router();
require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY;

/* GET users listing. */
router.get('/findByIngredients', async function(req, res, next) {
  const ingredients = req.query.ingredients;
 try {
  const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`, {

  }) 

  res.send(response.data)
 } catch (error) {
  res.status(500).send(error, "Failed to fetch the recipe")
 }
});

module.exports = router;
