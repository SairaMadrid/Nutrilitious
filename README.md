# MVP: Nutrilitious App

<img src="./client/src/assets/logo.png" alt="Image of the Nutrilitious logo" width="200"/>

Nutrilitous is a web app where users can find delicious recipes based on the ingredients in their fridge. They can create a profile to benefit from additional features, such as saving favourite recipes and querying an OpenAI assistant for inspirational recipes that are based on their own preferences.

## Description

This README file provides an overview of the project, its features, installation instructions, and usage guidelines.

For this project, 4 CodeOP students (Carli, Irene, Saira, and Steph) worked together in the course of about 2 1/5 weeks to create the Nutrilitious MVP.

(`The intention behind this idea was to create a web app that..... because....`) (Carli)

These are the pages: the splash page, `Home`, `About`, `Register`, `Login`, and `Profile`.

## Database

The necessary database for this website consists of two tables (`profiles` & `favourites`) with the following strcuture/columns:

![Image of the Nutrilitious database setup](./client/src/assets/DB_table_setup.png)

## Features, Pages, and Usage

### Navbar:

1. The Navbar component renders a responsive navigation bar at the top of the web application. It displays different links and buttons based on the user's authentication status, managed using the useAuth custom hook. It also offers seamless access to different sections of the application based on user authentication, ensuring a smooth and user-friendly navigation experience.

2. Imported Dependencies:

-React: For building UI components in React.
-Link from "react-router-dom": Creates links within React Router navigation.
-useAuth from "../hooks/useAuth": Manages user authentication functions and state.

3. Functions:

logout: Calls the auth.logout() method for user logout.

Unauthenticated Users:

Links: "Homepage," "About," "Register," and "Login."

Authenticated Users:

Links: "About," "Profile," and "Homepage."
Button: "Logout" triggers the logout function.

### Register

1. The given React component implements a registration form that allows users to create an account. It manages form inputs using React hooks and makes HTTP requests with Axios. The form includes fields for first name, last name, email, password, dietary preferences, cooking skills, and a self-description.

Functions:

-handleSkillsChange: Updates the user's cooking skills based on checkbox selection.
handleChange: Handles changes in form inputs and updates the user state accordingly.

-handleRegister: Validates form fields and completes the registration process.
handleTogglePassword: Toggles the visibility of the password input.

2. The form provides user-friendly labels and placeholders for inputs. The "Sign up" button submits the form, and any errors are displayed below it. A link to the login page is also provided.

3. The user register endpoint on the backend is `POST /api/auth/register`.

### Login:

1. The Login component is a user authentication module built with React on the frontend and Express on the backend. The features of the Login component include:

- Secure user login/logout functionality with JWT authentication;
- Password hashing and salt for enhanced security;
- Customisable error handling.

2. The user login endpoint on the backend is `POST /api/auth/login`.

### Homepage (Search):

1. The Search component is rendered on the homepage. It has three children that are conditionally rendered:

- the SearchBar component where users can search for recipes based on the ingredients the add in the input field;
- the Results component that displays max. 9 search results in bootstrap cards with recipe titles and images;
- the Recipe Card that's displayed when the user clicks on one of the results - it contains the full recipe incl. all ingredients, cooking time, and servings, as well as a heart button to add the current recipe to the user's profile as a favourite recipe;
- All recipe results and recipe cards are fed by results from calls to the Spoonacular API. We created our own endpoints to best access the data we need from Spoonacular.
- Through conditionally rendering these three components, we tried not to waste too many of our calls through our trial API keys. This means that when you search and the results are displayed, that is just one call, even if you open up the recipe card, the search results are still there. However, a new call has to be made to get the recipe details for the card you clicked on. If you go back to the search results hwoever, they will be displayed without having to make a another call for the same old input.

2. The endpoint to access the results from the search bar is `GET /api/recipe/findByIngredients`.
3. The endpoint to add, delete, and get favourite recipes is `/api/favourites`.

### Profile:

1. The Profile component is a customizable and secure module built with React on the frontend and Express on the backend. It displays authenticated user data and enables the users to manage their profiles. The main features include:

- Viewing profile information;
- Uploading and updating a profile image;
- Editing profile details provided during registration;
- Displaying a list of favorite recipes.

2. The user profile endpoint on the backend is `GET /api/auth/profile`.

#### Suggestions by OpenAI assistant:

1. The Recipe Assistant component is an interactive chatbot powered by the OpenAI's ChatGPT 3.5 turbo model, that is rendered below the user's profile. The bot has access to the user's cooking and eating preferences obtained from their profile. It uses this information to generate personalized recipes for the user. In case if the user has no specific prefences, the bot generates a random recipe.
2. The bot endpoint on the backend is `POST /api/assistant`. The request is made to the OpenAI API and the final output is generated by ChatGPT based on the authenticated user id and their preferences.

## Future Features:

Below are some possible ideas for future features:

1. Filter function

Filter by Diet:
Users will be able to choose their specific dietary preferences from a wide range of options, such as "Vegetarian," "Vegan," "Gluten-Free," "Keto," "Paleo," and more. By selecting a preferred diet, the app will exclusively display recipes that align with their chosen dietary lifestyle.

Filter by Cuisine:
To cater to users' diverse culinary interests, the app will offer a selection of popular cuisines from around the world. Users can explore and select cuisines like "Italian," "Mexican," "Asian," "Mediterranean," "Indian," and many others. Upon choosing a cuisine, the app will present recipes that represent the rich flavors and traditions of the selected culinary style.

Filter by Intolerances:
For users with specific food intolerances or allergies, the app will provide an "Intolerances" filter. Users can specify intolerances to ingredients like "Dairy," "Nuts," "Shellfish," "Eggs," "Soy," and more. The app will then present recipes that exclude these problematic ingredients, ensuring a safe and enjoyable cooking and dining experience.

2. Chatbox

The recipe app could introduce a Nutrition Chatbox, powered by ChatGPT, enabling users to ask nutrition-based questions about ingredients and recipes. The chatbox provides real-time responses with detailed nutrition information, personalized recommendations, and allergy alerts. It offers a user-friendly interface, continuous learning, and prioritizes user privacy. Future enhancements include meal planning and integration with fitness apps. The feature aims to promote healthy eating habits and enhance the overall cooking and dining experience for users.

3. Forgotten Password Feature (Password Reset)

The recipe app could offer a "Forgotten Password" feature that allows users to reset their passwords securely. Users can request a password reset via email, receive a unique reset link, and set a new password. The feature emphasizes user-friendliness, security, and data privacy. Future enhancements may include multi-factor authentication for added security.

4. Recipe database

The recipe app plans to enhance its functionality by integrating a comprehensive and user-friendly Recipe Database directly into the application. This future feature aims to provide a seamless and efficient experience for users, allowing them to access a diverse collection of recipes directly from the app's internal database, rather than relying on an external API.

Key Features:

Extensive Recipe Collection: The integrated Recipe Database will offer an extensive collection of recipes, including a wide range of cuisines, dietary preferences, cooking styles, and skill levels.

Quick Access and Load Times: With the database being internal, users can quickly access recipes without the need for external API calls, resulting in faster load times and a smoother user experience.

Offline Availability: Users will have access to their favorite recipes even in offline mode, ensuring they can cook and follow instructions without an internet connection.

Customizable Sorting and Filtering: The Recipe Database will enable users to sort and filter recipes based on various criteria, such as ingredients, cooking time, calorie count, and more.

User-Generated Content: Users can contribute their recipes to the database, fostering a vibrant community-driven platform for sharing culinary creations.

Personalized Recipe Recommendations: The app will utilize data from user interactions to offer personalized recipe recommendations based on their cooking preferences and history.

## Installation

To install and run this MVP locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/CodeOp-tech/FSPT16-group-2.git
2. Install the dependencies:
   npm install
3. Navigate to the client and repeat:
   - cd client
   - npm install
4. Configure the environment variables:
   - Open the `.env` file.
   - Replace the values with your specific configuration (especially your PW for mySQL). You will need api keys from both Spoonacular as well as the OpenAI api (ChatGPT).
   - Please add to `.env` file: SUPER_SECRET=shhh
   - Before the next steps, you should create a mySQL database named `nutri_profiles`
   - Then you can cd back to my-first-mvp and run the following request in the terminal: `npm run migrate`. This will trigger the database.js to fill the `nutri_profiles` database with all the necessary preset data for the website. Keep in mind to run npm migrate again whenever you want to reset the database or whenever you update/change the init_db.sql file.
5. Everytime you want to start the application:
   npm start
6. run the development server:
   - cd client
   - npm run dev
7. Access the application in your browser at `http://localhost:5173`.

### Further instructions on how to test some of the endpoints on Postman:

1. GET recipe titles by ingredients:

- Open a new tab on Postman, paste the address: http://localhost:4000/api/recipe/findByIngredients; in the 'Query Params' tab insert 'ingredients' under the 'Key' column and the ingredients you want to search under the 'Value' column. With this endpoint you can get a recipe id to fetch cooking instructions later;

2. GET recipe instructions by id

- Go to http://localhost:4000/api/recipe; in the 'Query Params' tab insert 'id' under the 'Key' column and the recipe id in the 'Value' column;

3. GET ingredients

- Go to http://localhost:4000/api/recipe/ingredients; in the 'Query Params' tab insert 'query' under the 'Key' column and the ingredient you would like to find under the 'Value' column;

4. GET filtered results

- Go to http://localhost:4000/api/recipe/complexSearch; in the 'Query Params' tab insert 'query' (the name of the recipe), 'diet', 'cuisine' and 'intolerances' under the 'Key' column and the keywords to filter your results under the 'Value' column. For example, query=pasta, diet=vegan, cuisine=Italian, intolerances=dairy. It is not necessary to fill out all four of them. Alternatively, you could add more than just one keyword, e.g. intolerances=dairy,gluten,soy.

5. How to test OpenAI endpoints on Postman:

- Generate an AI response based on the user's preferences:
- Go to http://localhost:4000/api/assistant and make a POST request. Wait a few seconds for the output to be generated.

## Contributing

Contributions are welcome! To contribute to our MVP, follow these steps:

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
- Axios
- JWT
- BCrypt Hash
- Postman
- MySQL
- Spoonacular API
- ChatGPT / OpenAI API
- Font Awesome
- Cloudinary
- Figma
- Looka
