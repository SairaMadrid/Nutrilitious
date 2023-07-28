# FSPT16-group-2 MVP

Nutrilicious App

## Description

This README file provides an overview of the project, its features, installation instructions, and usage guidelines.

For this project,... These are the pages: the splash page, `Home`, `About`, `Register`, `Login`, and `Profile`.

## Database

The necessary database for this website consists of two tables (`profiles` & `favourites`) with the following strcuture/columns:

(list table descriptions or add photo of mySQL)

![Image of database setup](./client/src/assets/DB_table_setup.png)

## Features, Pages, and Usage

### Language feature:

By clicking on the top buttons `English`, `German`, and `French`, the content of all three main pages (`Home`, `Menu`, `Visit the Café`) will be displayed in the respective language.

### Pages and Usage:

1. `Home`:
   React Route: "/"

This page displays the `Choc of the Month` that is fetched from the MySQL database via GET request. The name of the item, as well as the image and the description are called and displayed. There is a preset `Loading...` object that will be displayed until the items have been successfully fetched and displayed.
The link to the menu at the end of the text that says `click here` is being added dynamically with the `addLink` function. Every menu item has this keyword in the description for all three languages.

2. `Menu`:
   React Route: "/menu"

Here, too, the content is fetched via GET request and there is a preset `Loading...` object that will be displayed until the items have been successfully fetched and displayed.
Users can view the whole menu with names of each item, ingredients, and prices.
Within the ftech request, there are filters to sort all items accordingly to their boolean state (isWarmBeverage, isColdBeverage, isLunch, etc.), so that they will be displayed in the right spot on the menu.

3. `Visit the Café`:
   React Route: "/visit-the-cafe"

This is just a static and the least interesting page. For the future, it would be nice to have a contact form here to make reservations, but for now it's just here to round up the image of the Mademoiselle Chocoholic prototype.

4. Admin:
   React Route: "/admin"

A GET request fetches all relevant information within a table that the café owner wants to take a look at and adapt/change/delete.
At the bottom of the page, there are three buttons that lead to three other components/micro-pages: `Add a New Item`, `Edit an Item`, and `Delete an Item`.

5. Add:
   React Route: "/add"

By filling out the entire form, the café owner can add a new item to the inventory/menu. She has to fill out everything, otherwise an alert-message will pop up and nothing will be sent to the database. This is to avoid her adding incomplete rows that will mess up the what is displayed on her website.

6. Edit:
   React Route: "/edit"

First, Mademoiselle Chocoholic has to input the ID of the item she wants to edit and submit. Then, she'll see the same form as to add a new item, but with pre-filled input fields and pre-selected select-dropdowns that contain exactly the information of the item she wants to edit. This makes things a bit easier and quicker for her. She only has to make the necessary changes, plus (unfortunately) also always adapt the date because it shows up a bit messed up. She has to add one day and delete the time. Most certainly, there will be an alert if the French text hasn't been adapted as well. The alert message will explain that she must check for single apostrophes in the French text that are causing an error in the backend. To escape the single apostrophes that are being read as quotation marks, she must add a second one right next to it (e.g. change "l'harmonie parfaite" to "l''harmonie parfaite"). These irritating bugs should be fixed in the future. Here too, no field must be left empty before the edited form can be submitted. If the café owner wishes to cancel the process, she will be brought back to the point where she can add the ID of an item she wishes to edit.

7. Delete:
   React Route: "/delete"

Works similarily as the Edit page: First, the café owner has to input the ID of the item she wishes to remove from the menu. Then Mademoiselle Chocoholic will be asked if she is sure that she wants to delete the following menu item (incl. the item ID and name in English). Finally, the item will be removed from the inventory/menu. If the item with the given ID does not exist, a pop-up message will let Mademoiselle Chocoholic know.

## Future Features

## Installation

To install and run this MVP locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/Steph-Aniee/my-first-mvp.git
2. Navigate to the project directory:
   cd my-first-mvp
3. Install the dependencies:
   npm install
4. Navigate to the client and repeat:
   - cd client
   - npm install
5. Configure the environment variables:
   - Open the `.env` file.
   - Replace the values with your specific configuration (especially your PW for mySQL). You will need api keys from both Spoonacular as well as the OpenAI api (ChatGPT).
   - Before the next steps, you should create a mySQL database named `nutri_profiles`
   - Then you can cd back to my-first-mvp and run the following request in the terminal: `npm run migrate`. This will trigger the database.js to fill the `nutri_profiles` database with all the necessary preset data for the website.
6. Start the application:
   npm start
7. run the development server:
   - cd client
   - npm run dev
8. Access the application in your browser at `http://localhost:5173`.

## Contributing

Contributions are welcome! To contribute to my MVP, follow these steps:

1. Fork the repository.
2. Create a new branch:
   git checkout -b feature/your-feature
3. Make your changes and commit them:
   git commit -m "Add your commit message here"
4. Push your changes to your forked repository:
   git push origin feature/your-feature
5. Open a pull request in the original repository.

## Acknowledgements

- Vite + React
- Bootstrap
- Node.js
- Express.js
- MySQL
- ChatGPT / OpenAI API
- Looka

### Notes Saira:

##React Router

-To install the Router, run the following command: npm install react-router-dom

##Password hidden or seen on register page

You need to install this package: npm install react-icons --save

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
