// importing chnage content javascript file
import * as first from './changeContent.js';

document.getElementById('login-link').addEventListener('click', first.login);
document.getElementById('regpage').addEventListener('click', addCustomer);

/* Posts a new user to the server. */
export function addCustomer() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;

    function validateEmail() {
        // variable to store emailID
        var emailID = email;
        // getting posotion of @ from user input 
        let atpos = emailID.indexOf("@");
        // getting position of . from the user input 
        let dotpos = emailID.lastIndexOf(".");

        // checking if @ and . is there in the email and if there is it in a valid position
        if (atpos < 1 || (dotpos - atpos < 2)) {
            // if the condition evaluates to false then alert pops up 
            alert("Please enter correct email ID");
            return false;
        }
        return (true);
    }

    function passwordStrength() {

        // this object has the special characters, letters everything that is necessary for a strong password
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        // comparing user inputted password with the condition for strong password
        if (mediumRegex.test(pass) == true) {
            return true;
        }
        else {
            return false;
        }
    }

    // checking if the user has entered first name 
    if (fname == "") {
        alert("First name field cannot be empty");
        fname.focus();
        return false;
    }

    // checking if the user has entered last name
    else if (lname == "") {
        alert("Last name field cannot be empty");
        lname.focus();
        return false;
    }

    // checking if the user has entered email and if user has entered a valid email
    else if (email == "" || validateEmail() == false) {
        alert("Email field cannot be empty");
        return false;
    }

    // checking if the user has entered a password
    else if (pass == "") {
        alert("Password field cannot be empty");
        return false;
    }

    // checking if the user has entered confirm passowrd field as well 
    else if (cpass == "") {
        alert("Confirm Password field cannot be empty");
        return false;
    }

    // checking if the user has entered same passowrd in both the fields that is password and confirm password 
    else if (pass != cpass) {
        alert("Your password is not matching");
        return false;
    }

    // checking if the user has entered same password in both the fields and also the password is strong 
    else if ((pass == cpass) && passwordStrength() == false) {
        alert("Please type a strong password");
        return false;
    }
    // else if (email == "" ) {
    //     alert("Please type correct email");
    //     return false;
    // }
    else {
        //Create object with user data
        let custObj = {
            fname: fname,
            lname: lname,
            email: email,
            pass: pass
        };

        //Set up function that is called when reply received from server
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("User added successfully");
                alert("You are registered. You can login with your credentials!!");
                first.login();
            } else if (this.readyState == 4 && this.status == 400) {
                console.log("Error adding user");
                alert("User already registered");
                first.register();
            }
        };

        //Send new user data to server
        xhttp.open("POST", "/customers", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(custObj));
    }
}

export function checklogin() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    if (email == "") {
        alert("email field cannot be empty");
        email.focus();
        return false;
    }

    // checking if the user has entered last name
    else if (pass == "") {
        alert("pass field cannot be empty");
        pass.focus();
        return false;
    }
    else {
        //Create object with user data
        let userObj = {
            email: email,
            pass: pass
        };

        //Set up function that is called when reply received from server
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("loggedin successfully");
                // access the name value returned from the server
                const response = JSON.parse(this.responseText);
                console.log(response);
                first.recipePage();
                updateUserDet(response[0].userId);
            }
            else if (this.readyState == 4 && this.status != 200) {
                console.log("Wrong Credentials");
                alert("Wrong credentials!! Please try again.");
                first.login();
            }
        };

        xhttp.onerror = function () {
            console.error("Error making request.");
        };

        //Send new user data to server
        xhttp.open("POST", "/login", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(userObj));
    }
}

export function addRecipedb() {
    const addForm = document.querySelector('.addRecipeForm');

    let dishName = addForm.querySelector('#dname').value;
    let cuisine = addForm.querySelector('#cuisine').value;
    let mealType = addForm.querySelector('#mealtype').value;
    let servings = addForm.querySelector('#serve').value;
    let ingredients = addForm.querySelector('#ingredients').value;
    let instructions = addForm.querySelector('#instructions').value;
    let imgPath = addForm.querySelector('#imgpath').value;
    let time = addForm.querySelector('#time').value;
    let parts = imgPath.split("\\");
    let filename = parts.pop();
    console.log(filename); // "brownie.png"

    let formData = {
        dishName: dishName,
        cuisine: cuisine,
        mealType: mealType,
        servings: servings,
        ingredients: ingredients,
        recipe: instructions,
        image: filename,
        time: time
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            alert("Recipe Added successfully :)");
            first.addRecipe();
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.log("Error adding recipe");
            alert("Error adding recipe");
        }
    };
    xhttp.open("POST", "/addrecipe", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(formData));
}

export function viewRecipe() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const res = JSON.parse(xhttp.responseText);
            console.log(res);
            const pagecontent = document.querySelector(".pagecontent");
            const content = document.createElement("div");
            content.classList.add("content");
            for (let i = 0; i < res.length; i++) {
                const recipeContainer = document.createElement("div");
                recipeContainer.classList.add("recipe-container");
                const recipe = document.createElement("div");
                recipe.classList.add("recipe");
                recipe.innerHTML = `
                    <img src="./images/${res[i].imagepath}" height="200px" width="300px">
                    <h5 class="mealtype" style="color: red; text-transform: capitalize;">${res[i].mealType}</h5>
                    <h2>${res[i].dishname}</h2>
                    <p class="cuisine">Cuisine: ${res[i].cuisine_name}</p>
                    <span> 
                    <p class="recipe-info">Time: ${res[i].time} | ${res[i].servings} Servings</p>
                    </span>
                    <button class="viewbtn" id="${res[i].recipeid}">View Recipe</button>
                    </span>
                `;
                recipeContainer.appendChild(recipe);
                content.appendChild(recipeContainer);
            }
            pagecontent.appendChild(content);
            const viewButtons = document.querySelectorAll(".viewbtn");
            viewButtons.forEach((button) => {
                button.onclick = viewIndRecipe;
            });
            document.getElementById('searchbtn').addEventListener('click', search);

        }
    };

    //Request data for all customers
    xhttp.open("GET", "/allrecipes", true);
    xhttp.send();
}

export function viewIndRecipe() {
    const viewButtons = document.querySelectorAll('.viewbtn');
    viewButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const mainPage = document.querySelector('body');
            mainPage.classList.add('recipe-page-open'); // Add a class to the body element
            const recipeId = event.target.id;
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const recipePage = document.querySelector('.recipe-page');
                        if (recipePage) {
                            recipePage.remove();
                        }
                        // Create new recipe page
                        const newRecipePage = document.createElement('div');
                        newRecipePage.classList.add('recipe-page');
                        const RecipeDiv = document.createElement('div');
                        RecipeDiv.classList.add('recipe-page-div');
                        newRecipePage.appendChild(RecipeDiv)
                        // add content to the new recipe page
                        document.body.appendChild(newRecipePage);
                        const recipe = JSON.parse(xhr.responseText)[0];
                        console.log(recipe);
                        // recipePage.classList.add('recipe-page');
                        RecipeDiv.innerHTML = `
                        <h2>${recipe.dishname}</h2>
                        <img src="./images/${recipe.imagepath}" height="300px" width="400px">
                        <h4 class="mealtype">${recipe.mealType}</h4>
                        <h4 class="cuisine">Cuisine: ${recipe.cuisine_name}</h4>
                        <h5 class="recipe-info">Time: ${recipe.time} | ${recipe.servings} Servings</h5>
                        <h3>Ingrediants</h3>
                        <p>${recipe.ingredients}</p>
                        <h3>Recipe</h3>
                        <p>${recipe.recipe}</p>
                        <button class="like-button">Like</button>
                        <p><span id="like-count">${recipe.likes_count}</span></p>
                        <button class="closebtn">Close</button>
                        `;
                        const pagebody = document.querySelector("body");
                        pagebody.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                        const closeBtn = newRecipePage.querySelector('.closebtn');
                        closeBtn.addEventListener('click', () => {
                            newRecipePage.remove();
                            pagebody.style.removeProperty("background-color"); // Removes the background-color style
                            mainPage.classList.remove('recipe-page-open'); // Remove the class from the body element
                        });
                        const likeBtn = newRecipePage.querySelector('.like-button');
                        likeBtn.addEventListener('click', () => {
                            likeRecipe(recipe.recipeid);
                        });
                    } else {
                        console.log('Error retrieving recipe');
                    }
                }
            };
            xhr.open('GET', '/recipes/' + recipeId, true);
            xhr.send();
        });
    });
}

export function search() {
    const searchquery = document.getElementById("searchbar").value;
    const content = document.querySelector(".content");

    let squery = {
        criteria: searchquery
    };

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(xhttp.responseText);
            content.innerHTML = "";
            if (res == "") {
                content.innerHTML = `<p> Requested Recipes Not Found </p>`;
                // viewRecipe();
            }
            else {
                const newContent = document.createElement("div"); // create a new div for the new content
                newContent.classList.add("content"); // add the class "content" to the new div
                for (let i = 0; i < res.length; i++) {
                    const recipeContainer = document.createElement("div");
                    recipeContainer.classList.add("recipe-container");
                    const recipe = document.createElement("div");
                    recipe.classList.add("recipe");
                    recipe.innerHTML = `
                    <img src="./images/${res[i].imagepath}" height="200px" width="300px">
                    <h5 class="mealtype" style="color: red; text-transform: capitalize;">${res[i].mealType}</h5>
                    <h2>${res[i].dishname}</h2>
                    <p class="cuisine">Cuisine: ${res[i].cuisine_name}</p>
                    <span> 
                    <p class="recipe-info">Time: ${res[i].time} | ${res[i].servings} Servings</p>
                    </span>
                    <button class="viewbtn" id="${res[i].recipeid}">View Recipe</button>
                `;
                    recipeContainer.appendChild(recipe);
                    newContent.appendChild(recipeContainer);
                }
                const viewButtons = newContent.querySelectorAll(".viewbtn");
                viewButtons.forEach((button) => {
                    button.onclick = viewIndRecipe;
                });
                content.replaceWith(newContent); // replace the old content with the new content
            }
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.log("Error getting recipe");
            alert("Error getting recipe");
        }
    };
    xhttp.open("POST", "/search", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(squery));
}


export function likeRecipe(recipeid) {
    const likeCount = document.getElementById("like-count");

    let robj = {
        rid: recipeid
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            const currentCount = parseInt(likeCount.innerHTML);
            const newCount = currentCount + 1;
            likeCount.innerHTML = newCount;
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.log("Error liking recipe");
        }
    };
    xhttp.open("POST", "/likes", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(robj));
}

export function updateUserDet(uId) {
    const mainPage = document.querySelector('body'); 
    const editProf = document.querySelector('#editProf');
    editProf.addEventListener('click', (event) => {
        const pagebody = document.querySelector('body');

        // Create a new div element to hold the edit form
        const editDiv = document.createElement('div');
        editDiv.classList.add('edit-popup');

        // Send a GET request to retrieve user details
        const xhrGet = new XMLHttpRequest();
        xhrGet.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const user = JSON.parse(xhrGet.responseText)[0];

                    // Create the edit form
                    editDiv.innerHTML = `
              <p class="pagebody">
                First Name: <input type="text" id="fname" value="${user.fname}"><br>
                Last Name: <input type="text" id="lname" value="${user.lname}"><br>
                Email: <input type="email" id="email" value="${user.email}"><br>
                Password: <input type="password" id="pass" value="${user.password}"><br>
                <button id="save" class="savebtn">Save Changes</button><br>
              </p>
            `;

                    // Style the edit form
                    editDiv.style.position = 'fixed';
                    editDiv.style.top = '50%';
                    editDiv.style.left = '50%';
                    editDiv.style.transform = 'translate(-50%, -50%)';
                    editDiv.style.backgroundColor = 'white';
                    editDiv.style.padding = '20px';
                    editDiv.style.borderRadius = '5px';
                    editDiv.style.boxShadow = '0px 5px 10px rgba(0, 0, 0, 0.2)';
                    editDiv.style.zIndex = '999';

                    // Append the edit form to the page body
                    pagebody.appendChild(editDiv);

                    // Create a new div element to hold the overlay
                    const overlay = document.createElement('div');
                    overlay.classList.add('overlay');

                    // Add the overlay to the page
                    pagebody.appendChild(overlay);

                    // Apply styles to display the overlay
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    overlay.style.zIndex = '998';

                    // Add a click event listener to the Save Changes button
                    const saveBtn = editDiv.querySelector('.savebtn');
                    saveBtn.addEventListener('click', () => {
                        const xhrPost = new XMLHttpRequest();
                        xhrPost.onreadystatechange = function () {
                            if (this.readyState === 4) {
                                if (this.status === 200) {
                                    editDiv.remove();
                                    overlay.remove();
                                    pagebody.classList.remove("overlay"); 
                                    mainPage.classList.remove('overlay'); // Removes the background-color style
                                    mainPage.classList.remove('user-edit-page-open'); // Remove the class from the body element
                                } else {
                                    console.log('Error saving user details');
                                }
                            }
                        };
                        xhrPost.open('POST', '/edituser/' + uId, true);
                        xhrPost.setRequestHeader('Content-type', 'application/json');
                        const custObj = {
                            fname: document.getElementById('fname').value,
                            lname: document.getElementById('lname').value,
                            email: document.getElementById('email').value,
                            password: document.getElementById('pass').value,
                            userId: uId
                        };
                        xhrPost.send(JSON.stringify(custObj));
                    });
                } else {
                    console.log('Error retrieving user details');
                }
            }
        };
        xhrGet.open('GET', '/edituser/' + uId, true);
        xhrGet.send();
    });
}
