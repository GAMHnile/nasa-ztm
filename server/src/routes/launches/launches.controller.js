const { getAllLaunches, addNewLaunch, abortLaunch, existsLaunchWithId } = require("../../models/launches.model");

const httpGetAllLaunches = (req, res) => {
  res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
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

const httpAbortLaunch = (req, res) =>{
    const launchId = +req.params.id;
    if(!existsLaunchWithId(launchId)){
        return res.status(400).json({error: "Invalid launch id"});
    }
    const deletedLaunch = abortLaunch(launchId);
    return res.status(200).json(deletedLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
