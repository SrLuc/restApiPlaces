const express = require("express");
const UserController = require("../controllers/user.controller");
const route = express.Router();

route.get("/", UserController.getAllUser);

route.post("/signup", UserController.signUp);

route.post("/login", UserController.login);

module.exports = route;
