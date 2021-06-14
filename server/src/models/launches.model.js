const launches = new Map();

let latestFlightNumber = 100;

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

const existsLaunchWithId = (launchId) => {
  const launch = launches.get(launchId);
  if (!launch) return false;
  return true;
};

const getAllLaunches = () => {
  const launchesArr = Array.from(launches.values());
  return launchesArr;
};

const addNewLaunch = (launch) => {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["Zero to masterty", "NASA"],
      upcoming: true,
      success: true,
    })
  );
};

const abortLaunch = (launchId) => {
  const launch = launches.get(launchId);
  launch.success = false;
  launch.upcoming = false;
  return launch;
};

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
