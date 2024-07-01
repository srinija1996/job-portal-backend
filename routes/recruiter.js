const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Recruiter = require("../models/Recruiter");
const auth = require("../Auth/auth");
const route = express.Router();

route.post("/register", async (req, res) => {
  const { companyName, email, password } = req.body;
  try {
    const isCompanyExisted = await Recruiter.findOne({ companyName });
    if (!isCompanyExisted) {
      const salt = await bcrypt.genSalt(10);
      const recruiter = new Recruiter({
        companyName,
        email,
        password: await bcrypt.hash(password, salt),
      });
      const newRecruiter = await recruiter.save();
      res.send({
        message: "Recruiter account created successfully",
        id: newRecruiter.id,
      });
    } else {
      res.status(201).send({ message: "Company already existed" });
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const recruiter = await Recruiter.findOne({ email });
    if (recruiter) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        recruiter.password
      );
      if (isPasswordMatched) {
        const payload = { user: { ...recruiter, type: "recruiter" } };
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
      res.status(401).send("Company not existed ");
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
});

route.get("/company-details", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const recruiter = await Recruiter.findById(id);
    res.send(recruiter, "s");
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = route;
