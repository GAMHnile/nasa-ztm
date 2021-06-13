const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

const httpGetAllLaunches = (req, res) => {
  res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  launch.launchDate = new Date(launch.launchDate);
  if(isNaN(launch.launchDate)){
      return res.status(400).json({error: "Invalid date"})
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
