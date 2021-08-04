const express = require("express");
const planetsRouter = require("./planets/planets.route");
const launchesRouter = require("./launches/launches.route");

const api = express.Router();

api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = {
  api,
};
