const express = require("express");
const route = express.Router();
const createUserValiation=require("../middleware/userValidation")
const createBookValiation=require("../middleware/bookValidation")
const userController=require('../contoller/userController')
const bookController=require('../contoller/bookController')
const middleware=require('../middleware/middleware')




route.get("/test-me", (req, res) => {
    res.send("My first ever api!");
  });
  
route.post('/register',createUserValiation.cuv,userController.createUser)
route.post('/login', userController.loginUser)
route.post('/books',middleware. authentication,createBookValiation.cbv, bookController.createBook)
route.get('/books',middleware. authentication,bookController.getBooks)

module.exports = route;
