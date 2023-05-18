//Import the mysql module and create a connection pool with user details
const { response } = require('express');
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "ss",
    password: "Sindu_2004",
    database: "Recipedb",
    debug: false
});

//Gets all recipes
exports.getAllRecipes = (response) => {
    //Build query
    let sql = "SELECT * FROM recipe " +
        " INNER JOIN cuisine ON recipe.cuisine_id = cuisine.cid " +
        " INNER JOIN meal_type ON recipe.meal_id = meal_type.mid";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else {//Return results in JSON format 
            // console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
        }
    });
};

//Gets all recipes
exports.getoneRecipe = (recipeId, response) => {
    //Build query
    let sql = "SELECT * FROM recipe " +
        " INNER JOIN cuisine ON recipe.cuisine_id = cuisine.cid " +
        " INNER JOIN likes ON recipe.recipeid = likes.recipeid " +
        " INNER JOIN meal_type ON recipe.meal_id = meal_type.mid where recipe.recipeid = " + recipeId + " ";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else {//Return results in JSON format 
            console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
        }
    });
};

//Gets all recipes
exports.getUser = (uId, response) => {
    //Build query
    let sql = "SELECT * FROM users where userId =  " + uId + " ";
    // let sql = "SELECT * FROM users where fname =  " + fname + " ";
    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else {//Return results in JSON format 
            console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
        }
    });
};


//Adds a new customer to database 
exports.addCustomer = (fname, lname, email, pass, response) => {
    //Build query
    let sql = "INSERT INTO users (fname, lname, email, password) " +
        "       VALUES ('" + fname + "','" + lname + "','" + email + "','" + pass + "')";

    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else {//Send back result
            response.send("{result: 'Customer added successfully'}");
        }
    });
}

// checks user credentials and logs them in the website
exports.checklogin = (email, pass, response) => {
    let sql = "SELECT * FROM users " +
        "       WHERE email='" + email + "' and password='" + pass + "'";

    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err) {
            //Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else {
            if (result.length > 0) {
                // Send back success response
                response.send(result);
            } else {
                //Send back error response
                response.status(400).json("{result: 'Incorrect email or password'}");
                console.log(result);
            }
        }
    });
}

// adding recipe 
exports.addRecipe = (dishName, cuisine, mealType, servings, ingredients, recipe, image, time, response) => {
    // Insert new recipe into recipe table
    let sql = "INSERT INTO recipe (dishname, cuisine_id, meal_id, servings, ingredients, recipe, imagepath, time) " +
        "VALUES ('" + dishName + "'," +
        "(SELECT cid FROM cuisine WHERE cuisine_name = '" + cuisine + "')," +
        "(SELECT mid FROM meal_type WHERE mealType = '" + mealType + "')," + "'" + servings + "','" + ingredients + "','" + recipe + "','" + image + "','" + time + "')";

    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else {//Send back result
            response.send("{result: 'Recipe added successfully'}");
        }
    });
}

// finds the recipe and displays it 
exports.search = (criteria, response) => {
    let sql = " SELECT * FROM recipe " +
        " INNER JOIN cuisine ON recipe.cuisine_id = cuisine.cid " +
        " INNER JOIN meal_type ON recipe.meal_id = meal_type.mid " +
        " WHERE cuisine.cuisine_name LIKE '%" + criteria + "%' " +
        " OR meal_type.mealType LIKE '%" + criteria + "%' " +
        " OR recipe.dishname LIKE '%" + criteria + "%'";


    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).send(errMsg);
        }
        else {
            console.log(criteria);
            console.log(result);
            //Send back result
            response.send(JSON.stringify(result));
        }
    });

}

// updates like count
exports.likes = (rid, response) => {
    let sql = "UPDATE likes SET likes_count = likes_count + 1 WHERE recipeid = " + rid + " ";

    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).send(errMsg);
        }
        else {
            console.log(result);
            //Send back result
            response.status(200).send("{result: 'Likes updated successfully'}");
        }
    });
}

// updates user details into database 
exports.updateUser = (fname, lname, email, pass, uId, response) => {
    console.log("UserID: " + uId);
    let sql = "UPDATE users SET fname = '" + fname + "', lname = '" + lname + "', email = '" + email + "', password = '" + pass + "' " +
        " WHERE userId = " + uId + " ";

    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).send(errMsg);
        }
        else {
            console.log(result);
            //Send back result
            response.status(200).send("{result: 'User updated successfully'}");
        }
    });
}
