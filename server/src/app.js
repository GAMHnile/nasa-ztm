const express = require("express");
const cors = require("cors");
const planetsRouter = require("./routes/planets.route");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join("..", "public")));

app.use("/planets", planetsRouter);

app.get("/", (req, res) => {
  return res.sendFile(path.join("..", "public", "index.js"));
});

module.exports = app;
