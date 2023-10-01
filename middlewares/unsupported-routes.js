const HttpError = require("../models/error-model");

const unsupportedRoutes = (req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
};

module.exports = unsupportedRoutes;
