const express = require("express");
const UserController = require("../controllers/user.controller");
const route = express.Router();
const validator = require("../certificates/validation-user");

route.get("/", UserController.getAllUser);

route.post("/signup", validator.signupValidation, UserController.signUp);

route.post("/login", UserController.login);

module.exports = route;
