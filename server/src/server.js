const http = require("http");
require("dotenv").config();

const app = require("./app");
const { connectMongoose } = require("./services/mongo");
const { loadPlanets } = require("./models/planets.model");
const { loadLaunches } = require("./models/launches.model");

const PORT = process.env.PORT;
const server = http.createServer(app);

async function startServer() {
  await connectMongoose();
  await loadPlanets();
  await loadLaunches();
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
}

startServer();
