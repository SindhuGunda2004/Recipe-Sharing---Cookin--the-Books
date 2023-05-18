// importing client javascript file 
import * as second from './client.js';

// login page content
export function login() {
  const footer = document.querySelector("footer")
  const pagecontent = document.querySelector(".pagecontent");
  pagecontent.innerHTML = "";
  pagecontent.innerHTML = `
  <header class="navbar">
        <p class="webname">Cookin' the Books</p>
    </header>
    <br>
      <div class="pagehead"> Login </div><br><br><br>
      <div class="pagebody">
  <label for="email">Email:</label>
  <input type="email" id="email"><br><br>
  <label for="pass">Password:</label>
  <input type="password" id="pass"><br><br>
  <button id="checklog" class="btn">Login</button><br>
  <div>New user? <u id="regpage">Click here to register</u></div> <br>
</div>
      </div>`;
  const registerButton = document.getElementById("regpage");
  registerButton.onclick = register;
  document.getElementById('checklog').addEventListener('click', second.checklogin);
}

// register page content
export function register() {
  const pagecontent = document.querySelector(".pagecontent");
  pagecontent.innerHTML = "";
  pagecontent.innerHTML = `
  <header class="navbar">
        <p class="webname">Cookin' the Books</p>
    </header>
    <div class="pagehead">
    Register
</div>
<!-- Form to add new user -->
<p class="pagebody">
    First Name: <input type="text" id="fname"><br>
    Last Name: <input type="text" id="lname"><br>
    Email: <input type="email" id="email"><br>
    Password: <input type="password" id="pass"><br>
    Confirm Password: <input type="password" id="cpass"><br><br>
    <button id="adduser" class="btn">Register</button><br>
    Existing user? <u id="logpage">Click here to login</u>
</p>`;
  const loginButton = document.getElementById("logpage");
  loginButton.onclick = login;
  document.getElementById('adduser').addEventListener('click', second.addCustomer);
}

// logout page content
export function logout() {
  const pagecontent = document.querySelector(".pagecontent");
  pagecontent.innerHTML = "";
  login();
}

// add recipe page content
export function addRecipe() {
  const pagecontent = document.querySelector(".pagecontent");
  const navbar = document.createElement("div");
  navbar.classList.add("navbar");
  navbar.innerHTML = "";
  navbar.innerHTML = ` 
  <div class="nav">
            <ul>
                <li><button id="editProf"><img src="../images/usericon.png" height="30px" width="30px" style="margin-left: 10px; margin-top: 1%;"></li>
                <li> <p style="margin-left: 560px; margin-top: 0%; font-size: 30px;">Cookin' the Books</p></li>
                <li><button class="logoutbtn" id="logoutbtn" style="margin-left: 500px; margin-top: 0%;"><u>Logout</u></button></li>
            </ul>
        </div>
        <div class="tabs">
        <ul>
            <li><button id="recipepage">Recipes</button></li>
            <li><button id="addRecipe" >Add Recipe</button></li>
        </ul>
    </div>
  `;
  pagecontent.innerHTML = "";
  pagecontent.appendChild(navbar);
  const recipetab = document.getElementById("recipepage");
  recipetab.onclick = recipePage;
  const addform = document.createElement("div");
  addform.classList.add("addRecipeForm");
  addform.innerHTML = "";
  addform.innerHTML = ` 
  <div class="bgimg">
  <div class="pagehead">
    Add Recipe 
</div>
<div class="pagebody">
    <label>Dish Image</label>
    <input type="file" id="imgpath"><br>
    <label>Dish Name</label>
    <input type="text" id="dname"><br>
    <label>Cuisine</label>
    <input type="text" id="cuisine"><br>
    <label>Meal Type</label>
    <input type="text" id="mealtype"><br>
    <label>Servings</label>
    <input type="text" id="serve"><br>
    <label>Time</label>
    <input type="text" id="time"><br>
    <label>Ingrediants</label>
    <textarea id="ingredients"></textarea><br>
    <label>Recipe</label>
    <textarea id="instructions"></textarea><br>
    <button id="addbtn">Add Recipe</button>
</div>
<div>
  `;
  pagecontent.appendChild(addform);
  document.getElementById('addbtn').addEventListener('click', second.addRecipedb);
  const logoutbtn = document.getElementById("logoutbtn");
  logoutbtn.onclick = logout;
}

// recipe page content
export function recipePage() {
  second.viewRecipe();
  const pagecontent = document.querySelector(".pagecontent");
  const navbar = document.createElement("div");
  navbar.classList.add("navbar");
  navbar.innerHTML = "";
  navbar.innerHTML = `
  <div class="nav">
    <ul>
      <li><button id="editProf"><img src="../images/usericon.png" height="30px" width="30px" style="margin-left: 10px; margin-top: 1%;"></button></li>
      <li> <p style="margin-left: 560px; margin-top: 0%; font-size: 30px;">Cookin' the Books</p></li>
      <li><button class="logoutbtn" id="logoutbtn" style="margin-left: 500px; margin-top: 0%;"><u>Logout</u></button></li>
    </ul>
  </div>
        <div class="tabs">
        <ul>
            <li><button id="recipepage">Recipes</button></li>
            <li><button id="addRecipe" >Add Recipe</button></li>
        </ul>
    </div>
  `;
  const banner = document.createElement("div");
  banner.classList.add("banner");
  banner.innerHTML = `
    <div class="bannerimg">
    <div class="search-container">
    <p class="shead">Find a Recipe</p>
    <span>
    <input id="searchbar" type="text">
    <button class="searchbtn" id="searchbtn" type="button">Search</button>
    </span>
</div>
</div>
<div class="pagehead">
    RECIPES
</div>
  `;
  pagecontent.innerHTML = "";
  pagecontent.appendChild(navbar);
  pagecontent.appendChild(banner);
  const logoutbtn = document.getElementById("logoutbtn");
  logoutbtn.onclick = logout;
  const addRecipetab = document.getElementById("addRecipe");
  addRecipetab.onclick = addRecipe;
  document.getElementById('searchbtn').addEventListener('click', second.search);
}

// search content
export function search() {
  const pagecontent = document.querySelector(".pagecontent");
  const navbar = document.createElement("div");
  navbar.classList.add("navbar");
  navbar.innerHTML = `
  <div class="nav">
    <ul>
      <li><button id="editProf"><img src="../images/usericon.png" height="30px" width="30px" style="margin-left: 10px; margin-top: 1%;"></button></li>
      <li> <p style="margin-left: 560px; margin-top: 0%; font-size: 30px;">Cookin' the Books</p></li>
      <li><button class="logoutbtn" id="logoutbtn" style="margin-left: 500px; margin-top: 0%;"><u>Logout</u></button></li>
    </ul>
  </div>
        <div class="tabs">
        <ul>
            <li><button id="recipepage">Recipes</button></li>
            <li><button id="addRecipe" >Add Recipe</button></li>
        </ul>
    </div>
  `;
  const banner = document.createElement("div");
  banner.classList.add("banner");
  banner.innerHTML = `
    <div class="bannerimg">
    <div class="search-container">
    <p class="shead">Find a Recipe</p>
    <span>
    <input id="searchbar" type="text">
    <button class="searchbtn" id="searchbtn" type="button">Search</button>
    </span>
</div>
</div>
<div class="pagehead">
    Recipes
</div>
  `;
  // Remove existing content from pagecontent
  pagecontent.innerHTML = "";
  // Append new content to pagecontent
  pagecontent.appendChild(navbar);
  pagecontent.appendChild(banner);
  const logoutbtn = document.getElementById("logoutbtn");
  logoutbtn.onclick = logout;
  const addRecipetab = document.getElementById("addRecipe");
  addRecipetab.onclick = addRecipe;
}
