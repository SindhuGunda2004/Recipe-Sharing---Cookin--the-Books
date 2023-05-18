//Database code that we are testing
let db = require('../database');

//Server code that we are testing
let server = require('../server.js')

//Set up Chai library 
let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

//Set up Chai for testing web service
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

//Import the mysql module and create a connection pool with the user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "ss",
    password: "Sindu_2004",
    database: "Recipedb",
    debug: false
});

//Wrapper for all database tests
describe('Database', () => {

    // //Mocha test for getAllCustomers method in database module.
    describe('#getUser', () => {
        it('should return all of the users in the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            let uId;
            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of customers is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if (resObj.length > 1) {
                    // uId = resObj[0].should.have.property('userId');
                    resObj[0].should.have.property('fname');
                    resObj[0].should.have.property('lname');
                    resObj[0].should.have.property('email');
                    resObj[0].should.have.property('password');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.getUser(4, response);
        });
    });


    // get recipes 
    describe('#getAllRecipes', () => {
        it('should return all of the recipes in the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            let uId;
            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of customers is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if (resObj.length > 1) {
                    // uId = resObj[0].should.have.property('userId');
                    resObj[0].should.have.property('dishname');
                    resObj[0].should.have.property('cuisine_id');
                    resObj[0].should.have.property('meal_id');
                    resObj[0].should.have.property('servings');
                    resObj[0].should.have.property('ingredients');
                    resObj[0].should.have.property('recipe');
                    resObj[0].should.have.property('imagepath');
                    resObj[0].should.have.property('time');
                    resObj[0].should.have.property('cuisine_name');
                    resObj[0].should.have.property('cid');
                    resObj[0].should.have.property('mid');
                    resObj[0].should.have.property('mealType');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.getAllRecipes(response);
        });
    });

    //Mocha test for getAllCustomers method in database module.
    describe('#addCustomer', () => {
        it('should add a customer to the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that customer has been added to database
                let sql = "SELECT fname FROM users WHERE fname='" + custFName + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err) {//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else {
                        //Check that customer has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM users WHERE fname='" + custFName + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) {//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else {
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random customer details
            let custFName = Math.random().toString(36).substring(2, 15);
            let custLName = "doe";
            let custEmail = "test@email.com";
            let custPass = "JJ@7565";

            //Call function to add customer to database
            db.addCustomer(custFName, custLName, custEmail, custPass, response);
        });
    });

    describe('#checklogin', () => {
        it('should login by checking details in the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that customer has been added to database
                let sql = "SELECT * FROM users WHERE email='" + custEmail + "' and password = '" + custPass +"'";
                connectionPool.query(sql, (err, result) => {
                    if (err) {//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else {
                        //Check that customer has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        // sql = "DELETE FROM users WHERE fname='" + custFName + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) {//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else {
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random customer detail
            let custEmail = "laraib.s@gmail.com";
            let custPass = "LS@123";

            //Call function to add customer to database
            db.checklogin(custEmail, custPass, response);
        });
    });

    // add recipe 
    describe('#addRecipe', () => {
        it('should add a recipe to the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that customer has been added to database
                let sql = "SELECT dishname FROM recipe WHERE dishname='" + dName + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err) {//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else {
                        //Check that customer has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        // sql = "DELETE FROM recipe WHERE dishname='" + dName + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) {//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else {
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random customer details
            let dName = Math.random().toString(36).substring(2, 15);
            let cuisine = "greek";
            let mealtype = "lunch";
            let servings = 5;
            let time = "30min";
            let ingredients = "xyz";
            let recipe = "xyz";
            let img = "xyz.jpg";

            //Call function to add customer to database
            db.addRecipe(dName, cuisine, mealtype, servings, time, ingredients, recipe, img, response);
        });
    });
    

});
