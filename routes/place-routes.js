const express = require("express");
const route = express.Router();
const PlaceController = require("../controllers/place-controller.js");

route.get("/", PlaceController.getAllPlaces);
route.get("/:pid", PlaceController.getPlaceById);
route.get("/user/:uid", PlaceController.getPlaceByUserId);
route.post("/", PlaceController.createPlace);
route.put("/:pid", PlaceController.updatePlace);
route.delete("/:pid", PlaceController.deletePlace);

module.exports = route;
