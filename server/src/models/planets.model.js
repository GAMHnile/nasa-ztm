const fs = require("fs");
const parse = require("csv-parse");
const path = require("path");

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
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found`);
        resolve();
      });
  });
}

const getAllPlanets = () =>{
  return habitablePlanets;
}

module.exports = {
  loadPlanets,
  getAllPlanets
};
