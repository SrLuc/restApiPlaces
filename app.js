const express = require("express");
const handleError = require("./middlewares/error.js");
const unsupportedRoutes = require("./middlewares/unsupported-routes.js");
const app = express();
const userRoutes = require("./routes/user-routes.js");
const placeRoutes = require("./routes/place-routes.js");

app.use(express.json());
app.use(handleError());
app.use(placeRoutes);
app.use(userRoutes);
app.use(unsupportedRoutes);

module.exports = app;
