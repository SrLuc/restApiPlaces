const DUMMY_PLACES = require("../models/data-model.js");
const HttpError = require("../models/error-model.js");
const uuid = require("uuid").v1;
const { validationResult } = require("express-validator");
const { getCoordinatesByAddress } = require("../util/location.js");

const getAllPlaces = async (req, res, next) => {
  const places = DUMMY_PLACES;
  res.json({ places });

  if (!places) {
    return next(new HttpError("Could not find places.", 404));
  }
};

const getPlaceById = (async = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find(({ id }) => {
    return id === placeId;
  });

  if (!place) {
    return next(new HttpError("Could not find Place for the Place iD", 404));
  }

  res.status(200).json({ place });
});

const getPlaceByUserId = async (req, res, next) => {
  const userID = req.params.uid;
  const place = DUMMY_PLACES.find(({ creator }) => {
    return creator === userID;
  });

  if (!place) {
    return next(
      new HttpError("Could not find place for the provided user id.", 404)
    );
  }

  res.status(200).json({ place });
};

const createPlace = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return next(new HttpError("Invalid Inputs, please check your datas", 422));
  }

  const { title, description, address, creator } = req.body;

  let location;
  try {
    location = await getCoordinatesByAddress(address);
  } catch (error) {
    return next(error);
  }

  const newPlace = {
    id: uuid(),
    title: title,
    description: description,
    address: address,
    coordinates: location,
    creator: creator,
  };

  DUMMY_PLACES.push(newPlace);
  res.status(201).json({ place: newPlace });
};

const updatePlace = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return next(new HttpError("Invalid Inputs, please check your datas", 422));
  }

  const placeID = req.params.pid;
  const { title, description } = req.body;

  const updatedPlace = { ...DUMMY_PLACES.find(({ id }) => id === placeID) };
  const placeIndex = DUMMY_PLACES.findIndex(({ id }) => id === placeID);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = async (req, res, next) => {
  const placeID = req.params.pid;

  if (!DUMMY_PLACES.findIndex(({ id }) => id === placeID)) {
    return next(new HttpError("Could not find a place for that id", 404));
  }

  res.status(200).json({ message: "Deleted Place." });
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
