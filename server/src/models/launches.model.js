const axios = require("axios");
const LaunchesModel = require("./launches.mongo");
const PlanetsModel = require("./planets.mongo");

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

async function findLaunch(filter) {
  return await LaunchesModel.findOne(filter);
}

const existsLaunchWithId = async (launchId) => {
  const launch = await findLaunch({ flightNumber: launchId });
  if (!launch) return false;
  return true;
};

const getAllLaunches = async (skip, limit) => {
  const launchesArr = await LaunchesModel.find({})
    .skip(skip)
    .limit(limit)
    .sort({ flightNumber: 1 });
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
  await LaunchesModel.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
};

const scheduleNewLaunch = async (launch) => {
  const planet = await PlanetsModel.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("No matching planet found");
  }
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

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
async function populateLaunches() {
  console.log("downloading launch data");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
    await saveLaunch(launch);
  }
}

const loadLaunches = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch data already loaded");
    return;
  } else {
    await populateLaunches();
  }
};

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
  loadLaunches,
};
