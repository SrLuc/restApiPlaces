const axios = require("axios");
const HttpError = require("../models/error-model");
const API_KEY = "AIzaSyDIlNYJmQJe_0wk12XuDU_tesHegqCes30";

const getCoordinatesByAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data) {
    return new HttpError(
      "Could not find the coordinates to especific address",
      422
    );
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = { getCoordinatesByAddress };
