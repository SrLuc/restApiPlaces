const DUMMY_PLACES = require("../models/data-model.js");
const HttpError = require("../models/error-model.js");
const uuid = require("uuid").v1;

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

const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.pid;
  const place = DUMMY_PLACES.find(({ id }) => {
    return id === userId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }

  res.json({ place });
};

const createPlace = async (req, res, next) => {
  const { title, description, address, location, creator } = req.body;

  const newPlace = {
    id: uuid(),
    title: title,
    description: description,
    address: address,
    coordinates: location,
    creator: creator,
  };

  DUMMY_PLACES.push(newPlace);
  res.status(201).json({ place:newPlace });
};

const updatePlace = async (req, res, next) => {
  const placeID = req.params.pid;
  const { title, description } = req.body;

  const updatedPlace = { ...DUMMY_PLACES.find(({ id }) => id === placeID) };
  const placeIndex = DUMMY_PLACES.findIndex(({ id }) => id === placeID);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = async (req, res, next) => {};

module.exports = {
  testPlace,
  getAllPlaces,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
