const express = require('express');
const cors = require("cors");
const planetsRouter = require('./routes/planets.route');

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json())


app.use("/planets", planetsRouter);


module.exports = app;