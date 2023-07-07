var express = require('express');
var router = express.Router();
require('dotenv').config();
const axios = require('axios'); 

const API_KEY = process.env.API_KEY;

// GET recipe titles by ingredients
//Open a new tab on Postman, paste the address: http://localhost:4000/api/recipe/findByIngredients;
//in the Query Params tab insert 'ingredients' under the 'Key' and the ingredients you want to search under the 'Value''
//here you can get a recipe id to fetch the cooking instructions
router.get('/findByIngredients', async function(req, res, next) {
  const ingredients = req.query.ingredients;
 try {
  const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5`, {
    params: {
      apiKey: API_KEY,
    }
  }) 
  res.send(response.data);
 } catch (error) {
  res.status(500).send(error, "Failed to fetch the recipe")
 }
});

//GET recipe instructions by id
//I couldn't assign the id to this endpoint without having the 404 error... 
//Go to http://localhost:4000/api/recipe; in the Query Params tab insert 'id' under the 'Key' and the recipe id in the 'Value'
router.get('/', async function(req, res, next) {
  const id = req.query.id;
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
      }
    })

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error)
  }
});

//GET ingredients
//Go to http://localhost:4000/api/recipe/ingredients; in the Query Params tab insert 'query' under the 'Key' and the ingredient you wanna find in the 'Value'
router.get('/ingredients', async function(req, res, next) {
  const ingredient = req.query.query;
  try {
    const response = await axios.get(`https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&addChildren=false&number=1`, {
      params: {
        apiKey: API_KEY,
      }
    })

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error)
  }
});


module.exports = router;
