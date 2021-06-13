const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "A tests flight",
    rocket: "Super awesome ship",
    launchDate: new Date("December 23, 2024"),
    destination: "Kepler -4b",
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch);

const getAllLaunches = () =>{
    const launchesArr = Array.from(launches.values());
    return launchesArr;
}

const addNewLaunch = (launch) =>{
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ["Zero to masterty", "NASA"],
        upcoming: true,
        success: true
    }))
}


module.exports = {
    getAllLaunches,
    addNewLaunch
}