const LaunchesModel = require("./launches.mongo");
const PlanetsModel = require("./planets.mongo");

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "A tests flight",
  rocket: "Super awesome ship",
  launchDate: new Date("December 23, 2024"),
  target: "Kepler -4b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const existsLaunchWithId = async (launchId) => {
  const launch = await LaunchesModel.findOne({ flightNumber: launchId });
  if (!launch) return false;
  return true;
};

const getAllLaunches = async () => {
  const launchesArr = await LaunchesModel.find({});
  return launchesArr;
};

const getLatestFlightNumber = async () => {
  let latestFlightNumber = DEFAULT_FLIGHT_NUMBER;
  const latestLaunch = await LaunchesModel.findOne({}).sort("-flightNumber");
  if (latestLaunch) {
    latestFlightNumber = latestLaunch.flightNumber;
  }

  return latestFlightNumber;
};

const saveLaunch = async (launch) => {
  const planet = await PlanetsModel.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("No matching planet found");
  }
  await LaunchesModel.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
};

const scheduleNewLaunch = async (launch) => {
  const latestFlightNumber = await getLatestFlightNumber();
  const newLaunch = {
    ...launch,
    flightNumber: latestFlightNumber + 1,
    customers: ["Zero to masterty", "NASA"],
    upcoming: true,
    success: true,
  };

  await saveLaunch(newLaunch);
};

const abortLaunch = async (launchId) => {
  const aborted = await LaunchesModel.updateOne(
    {
      flightNumber: launchId,
    },
    { success: false, upcoming: false }
  );
  return aborted.ok === 1 && aborted.nModified === 1;
};

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
};
