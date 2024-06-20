const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Candidate = require("../models/Candidate");
const auth = require("../Auth/auth");

const route = express.Router();

route.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, education, experience } =
    req.body;
  try {
    const isCandidateExisted = await Candidate.findOne({ email });
    if (!isCandidateExisted) {
      const salt = await bcrypt.genSalt(10);
      const candidate = new Candidate({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, salt),
        education,
        experience,
      });
      const newCandidate = await candidate.save();
      res.send(newCandidate.id);
    } else {
      res.status(201).send("User already existed");
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (candidate) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        candidate.password
      );
      if (isPasswordMatched) {
        const payload = { user: { ...candidate, type: "candidate" } };
        jwt.sign(payload, "secret_key", { expiresIn: "1d" }, (err, token) => {
          if (err) {
            throw err;
          }
          res.send({ token });
        });
      } else {
        res.status(401).send("Invalid Password");
      }
    } else {
      res.status(401).send("User not existed");
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
});

route.get("/user-details", auth, (req, res) => {
  try {
    const { id } = req.user;
    const candidate = Candidate.findById(id);
    res.send(candidate);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = route;
