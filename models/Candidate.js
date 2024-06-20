const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institute: {
    type: String,
    required: true,
  },
  startingYear: {
    type: Number,
    required: true,
  },
  endingYear: {
    type: Number,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
});

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  startingYear: {
    type: Number,
    required: true,
  },
  endingYear: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  education: [educationSchema],
  experience: [experienceSchema],
});

module.exports = mongoose.model("Candidate", candidateSchema);
