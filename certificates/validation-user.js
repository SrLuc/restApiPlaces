const { check } = require("express-validator");

const signupValidation = [
  check("name").not().isEmpty(),
  check("email").not().isEmpty().isEmail().normalizeEmail(),
  check("password").isLength({ min: 8 }),
];

module.exports = {
  signupValidation,
};
