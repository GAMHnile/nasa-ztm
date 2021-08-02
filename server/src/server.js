const http = require("http");
const app = require("./app");
const { connectMongoose } = require("./services/mongo");
const { loadPlanets } = require("./models/planets.model");

const PORT = 8000;
const server = http.createServer(app);

async function startServer() {
  await connectMongoose();
  await loadPlanets();
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
}

startServer();
