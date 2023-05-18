//Import the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

//Import database functions
const db = require('./database');

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());

//Set up express to serve static files from the directory called 'public'
app.use(express.static('public'));

//Set up application to handle GET requests sent to the customers path
app.get('/allrecipes', handleGetRequest);//Returns all customers

//Set up application to handle GET requests sent to the customers path
app.get('/recipes/:recipeId', handleGetRequesttwo);//Returns all customers

//Set up application to handle GET requests sent to the customers path
app.get('/edituser/:uId', handleGetRequestthree);//Returns all customers

//Set up application to handle POST requests sent to the customers path
app.post('/customers', handlePostRequest);//Adds a new customer

//Set up application to handle POST requests sent to the customers path
app.post('/login', handlePostRequesttwo);//Adds a new customer

//Set up application to handle POST requests sent to the customers path
app.post('/addrecipe', handlePostRequestthree);//Adds a new customer

//Set up application to handle POST requests sent to the customers path
app.post('/search', handlePostRequestfour);//Adds a new customer

//Set up application to handle POST requests sent to the customers path
app.post('/likes', handlePostRequestfive);//Adds a new customer

//Set up application to handle POST requests sent to the customers path
app.post('/edituser/:uId', handlePostRequestsix);//Adds a new customer

//Start the app listening on port 8080
app.listen(8080, () => {
    console.log("Sever started on port 8080");
});

//Handles GET requests to our web service
function handleGetRequest(request, response) {
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    //If path ends with 'customers' we return all customers
    if (pathEnd === 'allrecipes') {
        //Call function to return all customers
        db.getAllRecipes(response);
    }
    else {//The path is not recognized. Return an error message
        response.send("{error: 'Path not recognized'}")
    }
}

function handleGetRequesttwo(request, response) {
    // Get the recipe ID from the URL
    const recipeId = parseInt(request.params.recipeId);

    // Call function to return a specific recipe
    db.getoneRecipe(recipeId, response);
}

function handleGetRequestthree(request, response) {
    // Get the recipe ID from the URL
    const uId = parseInt(request.params.uId);

    // Call function to return a specific recipe
    db.getUser(uId, response);
}

//Handles POST requests to our web service
function handlePostRequest(request, response) {
    //Extract customer data
    let newCust = request.body;
    console.log("Data received: " + JSON.stringify(newCust));

    //Call function to add new customer
    db.addCustomer(newCust.fname, newCust.lname, newCust.email, newCust.pass, response);
}

//Handles POST requests to our web service
function handlePostRequesttwo(request, response) {
    //Extract customer data
    let userdet = request.body;
    console.log("Data received: " + JSON.stringify(userdet));

    //Call function to add new customer
    db.checklogin(userdet.email, userdet.pass, response);
}

//Handles POST requests to our web service
function handlePostRequestthree(request, response) {
    //Extract customer data
    let recipedet = request.body;
    console.log("Data received: " + JSON.stringify(recipedet));

    //Call function to add new recipe
    db.addRecipe(recipedet.dishName, recipedet.cuisine, recipedet.mealType, recipedet.servings, recipedet.ingredients, recipedet.recipe, recipedet.image, recipedet.time, response);
}

//Handles POST requests to our web service
function handlePostRequestfour(request, response) {
    //Extract customer data
    let sq = request.body;
    console.log("Data received: " + JSON.stringify(sq));

    //Call function to add new customer
    db.search(sq.criteria, response);
}

//Handles POST requests to our web service
function handlePostRequestfive(request, response) {
    //Extract customer data
    let id = request.body;
    console.log("Data received: " + JSON.stringify(id));

    //Call function to add new customer
    db.likes(id.rid, response);
}

//Handles POST requests to our web service
function handlePostRequestsix(request, response) {
    //Extract customer data
    let uDet = request.body;
    console.log("Data received: " + JSON.stringify(uDet));

    //Call function to add new customer
    db.updateUser(uDet.fname, uDet.lname, uDet.email, uDet.password, uDet.userId, response);
}

//Export server for testing
module.exports = app;
