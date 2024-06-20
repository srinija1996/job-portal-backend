const express = require("express");
const route = express.Router();
const Job = require("../models/Jobs");
const auth = require("../Auth/auth");

route.post("/add-job", auth, async (req, res) => {
  try {
    const {
      designation,
      company,
      skills,
      location,
      minExperience,
      maxExperience,
    } = req.body;
    const { type } = req.user;
    if (type === "recruiter") {
      const job = new Job({
        designation,
        company,
        skills,
        location,
        minExperience,
        maxExperience,
      });
      await job.save();
      res.send("Job added successfully");
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
});

route.get("/get-jobs", async (req, res) => {
  const {
    designation,
    company,
    skills,
    location,
    minExperience,
    maxExperience,
  } = req.query;
  const obj = {};
  if (designation) obj["designation"] = designation;
  if (company) obj["company"] = company;
  if (skills) obj["skills"] = skills;
  if (location) obj["location"] = location;
  if (minExperience) obj["minExperience"] = parseInt(minExperience);
  if (maxExperience) obj["maxExperience"] = parseInt(maxExperience);

  try {
    const jobs = await Job.find({
      designation: { $in: obj.designation.split(",") },
      company: { $in: obj.company.split(",") },
      skills: { $in: obj.skills.split(",") },
      location: { $in: obj?.location?.split(",") },
    });
    const filteredJobs = jobs.filter((job) => {
      if (
        (obj.minExperience >= job.minExperience &&
          obj.minExperience <= job.maxExperience) ||
        (obj.maxExperience >= job.minExperience &&
          obj.maxExperience <= job.maxExperience)
      ) {
        return job;
      }
    });
    res.send(filteredJobs);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = route;
