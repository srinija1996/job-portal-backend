const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: function (skills) {
        return skills.length > 0;
      },
      message: "At least one skill is required.",
    },
  },
  location: {
    type: [String],
    required: true,
    validate: {
      validator: function (location) {
        return location.length > 0;
      },
      message: "Add atleast one location.",
    },
  },
  minExperience: {
    type: Number,
    required: true,
  },
  maxExperience: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Job", JobSchema);
