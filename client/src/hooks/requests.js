const serverRoot = "http://localhost:8000";

async function httpGetPlanets() {
  // Load planets and return as JSON.
  try {
    return await fetch(`${serverRoot}/planets`).then((res) => res.json());
  } catch (err) {
    return [];
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  try {
    const launchesArr = await fetch(`${serverRoot}/launches`).then((res) =>
      res.json()
    );
    return launchesArr.sort((a, b) => a.flightNumber - b.flightNumber);
  } catch (err) {
    return [];
  }
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
