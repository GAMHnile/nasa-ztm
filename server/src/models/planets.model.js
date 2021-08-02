const fs = require("fs");
const parse = require("csv-parse");
const path = require("path");
const PlanetsModel = require("./planets.mongo");

const habitablePlanets = [];

async function loadPlanets() {
  return new Promise((resolve, reject) => {
    const isHabitablePlanet = (planet) => {
      return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6
      );
    };

    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          // habitablePlanets.push(data);
          await PlanetsModel.updateOne(
            { keplerName: data.kepler_name },
            { keplerName: data.kepler_name },
            { upsert: true }
          );
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const totalHabitablePlanets = (await getAllPlanets()).length;
        console.log(`${totalHabitablePlanets} habitable planets found`);
        resolve();
      });
  });
}

const getAllPlanets = async () => {
  const habitablePlanets = await PlanetsModel.find({}, { __v: 0, _id: 0 });
  return habitablePlanets;
};

module.exports = {
  loadPlanets,
  getAllPlanets,
};
