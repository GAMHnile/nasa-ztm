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

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const response = await fetch(`${serverRoot}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch)
    })
    return response;
  } catch (err) {
    return {
      ok: false
    }
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    const response = await fetch(`${serverRoot}/launches/${id}`, {
      method: "delete",
    })
    return response;
  } catch (err) {
    return {
      ok: false
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
