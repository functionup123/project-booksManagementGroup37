const express = require("express");
const route = express.Router();

const userController=require('../contoller/userController')
route.get("/test-me", (req, res) => {
    res.send("My first ever api!");
  });
  
route.post('/register',userController.createUser)
route.post('/login', userController.loginUser)

module.exports = route;
