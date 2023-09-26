const express = require("express");
const route = express.Router();
const PlaceController = require("../controllers/place-controller.js");

route.get("/placetest", PlaceController.testPlace);
route.get("/place", PlaceController.getAllPlaces);
route.get("/user/:pid", PlaceController.getPlaceByUserId);
route.post("/place", PlaceController.createPlace);

module.exports = route;
