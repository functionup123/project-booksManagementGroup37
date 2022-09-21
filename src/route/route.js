const express = require("express");
const route = express.Router();
const createUserValiation=require("../middleware/userValidation")
const userController=require('../contoller/userController')
const bookController=require('../contoller/bookController')




route.get("/test-me", (req, res) => {
    res.send("My first ever api!");
  });
  
route.post('/register',createUserValiation.cuv,userController.createUser)
route.post('/login', userController.loginUser)
route.post('/books', bookController.createBook)

module.exports = route;
