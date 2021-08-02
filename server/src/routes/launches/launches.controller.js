const {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
  existsLaunchWithId,
} = require("../../models/launches.model");

const httpGetAllLaunches = async (req, res) => {
  res.status(200).json(await getAllLaunches());
};

const httpAddNewLaunch = async (req, res) => {
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
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid date" });
  }
  try {
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (err) {
    if (err.message === "No matching planet found")
      return res.status(500).json({ error: "No matching planet found" });
  }
};

const httpAbortLaunch = async (req, res) => {
  try {
    const launchId = +req.params.id;
    const existsLauch = await existsLaunchWithId(launchId);
    if (!existsLauch) {
      return res.status(400).json({ error: "Invalid launch id" });
    }
    const isLaunchdeleted = await abortLaunch(launchId);
    if (isLaunchdeleted) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(200).json({ ok: false });
    }
  } catch (err) {
    return res.status(500).json({ error: "An error occured" });
  }
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
