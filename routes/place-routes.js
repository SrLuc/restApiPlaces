const express = require("express");
const route = express.Router();
const PlaceController = require("../controllers/place-controller.js");
const validator = require("../certificates/validation-places .js");

route.get("/", PlaceController.getAllPlaces);

route.get("/:pid", PlaceController.getPlaceById);

route.get("/user/:uid", PlaceController.getPlaceByUserId);

route.post("/", validator.createPlaceValidation, PlaceController.createPlace);

route.put("/:pid", validator.updatePlaceValidation, PlaceController.updatePlace);

route.delete("/:pid", PlaceController.deletePlace);

module.exports = route;
