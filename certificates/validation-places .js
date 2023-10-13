const { check } = require("express-validator");

const createPlaceValidation = [
  check("title").not().isEmpty(),
  check("address").not().isEmpty(),
  check("description").isLength({ min: 5 }),
];

module.exports = {
  createPlaceValidation,
};
