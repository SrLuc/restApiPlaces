const express = require("express");
const route = express.Router();
const PlaceController = require("../controllers/place-controller.js");

route.get("/placetest", PlaceController.testPlace);
route.get("/place", PlaceController.getAllPlaces);
route.get("/place/:pid", PlaceController.getPlaceByUserId);
route.post("/place", PlaceController.createPlace);
route.put("/place/:pid", PlaceController.updatePlace);
route.delete("/place/:pid", PlaceController.deletePlace);

module.exports = route;
