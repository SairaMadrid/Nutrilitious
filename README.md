# FSPT16-group-2

### Notes Steph:

- Need to npm install after pulling
- A necessary request in the terminal to run this project: npm run migrate

### Notes Saira:

##React Router

-To install the Router, run the following command: npm install react-router-dom
-created components for routes
-made changes to main.jsx to include BrowserRouter

### Notes Irene:

- How to test the recipe endpoints on Postman: 
- GET recipe titles by ingredients:
- Open a new tab on Postman, paste the address: http://localhost:4000/api/recipe/findByIngredients; in the Query Params tab insert 'ingredients' under the 'Key' column and the ingredients you want to search under the 'Value' column. With this endpoint you can get a recipe id to fetch cooking instructions later;

- GET recipe instructions by id
- Go to http://localhost:4000/api/recipe; in the Query Params tab insert 'id under the 'Key' column and the recipe id in the 'Value column';

- GET ingredients
- Go to http://localhost:4000/api/recipe/ingredients; in the Query Params tab insert 'query' under the 'Key' column and the ingredient you would like to find under the 'Value' column

### Notes Carli:
