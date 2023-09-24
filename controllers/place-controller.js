const DUMMY_PLACES = require("../models/data-model.js");
const HttpError = require("../models/error-model.js");

const testPlace = async (req, res, next) => {
  res.json({ message: "Place router Works!" });
};

const getAllPlaces = async (req, res, next) => {
  const places = DUMMY_PLACES;
  res.json({ places });

  if (!places) {
    return next(new HttpError("Could not find places.", 404));
  }
};

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }

  res.json({ place });
};

module.exports = {
  testPlace,
  getAllPlaces,
  getPlaceById,
};
