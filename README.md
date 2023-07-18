# FSPT16-group-2

### Notes Steph:

- To fill your nutri_profiles DB: npm run migrate

### Notes Saira:

##React Router

-To install the Router, run the following command: npm install react-router-dom

##Authentication and authorisation endpoints

### Notes Irene:

- please add to .env file: SUPER_SECRET=shhh

- How to test the Spoonacular recipe endpoints on Postman:
- GET recipe titles by ingredients:
- Open a new tab on Postman, paste the address: http://localhost:4000/api/recipe/findByIngredients; in the Query Params tab insert 'ingredients' under the 'Key' column and the ingredients you want to search under the 'Value' column. With this endpoint you can get a recipe id to fetch cooking instructions later;

- GET recipe instructions by id
- Go to http://localhost:4000/api/recipe; in the Query Params tab insert 'id under the 'Key' column and the recipe id in the 'Value column';

- GET ingredients
- Go to http://localhost:4000/api/recipe/ingredients; in the Query Params tab insert 'query' under the 'Key' column and the ingredient you would like to find under the 'Value' column

- GET filtered results
- Go to http://localhost:4000/api/recipe/complexSearch; in the Query Params tab insert 'query' (the name of the recipe), 'diet', 'cuisine', 'intolerances' under the 'Key' column and the keywords to filter your results under the 'Value' column. For example, query=pasta, diet=vegan, cuisine=Italian, intolerances=dairy. You don't need to fill out all four of them. Alternatively, you could add more than just one keyword, e.g. intolerances=dairy,gluten,soy.

- How to test OpenAI endpoints on Postman:
- Generate an AI response based on the user's preferences:
- Go to http://localhost:4000/api/assistant/:id (replace the :id with the actual user id) and make a POST request. The response will be generated in a few seconds.
- P.S. make sure to run this command in your terminal first: npm install openai.

### Notes Carli:
