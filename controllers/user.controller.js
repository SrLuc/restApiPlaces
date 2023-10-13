const DUMMY_USERS = require("../models/user-model");
const HttpError = require("../models/error-model");
const uuid = require("uuid").v1;

const getAllUser = (req, res, next) => {
  res.json({ DUMMY_USERS });
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = {
    id: uuid(),
    name: name,
    email: email,
    password: password,
  };

  const hasUser = DUMMY_USERS.find((p) => p.email === email);

  if (hasUser) {
    return next(
      new HttpError(
        "Credentials already Exists, please put different credentials",
        409
      )
    );
  }

  DUMMY_USERS.push(newUser);

  res.json({ newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((p) => p.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError(
        "Could not identify user, credentrial seem to be wrong",
        401
      )
    );
  }

  res.json({ message: "Logged In" });
};

module.exports = {
  getAllUser,
  signUp,
  login,
};
