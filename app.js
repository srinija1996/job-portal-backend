const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const candidateRouter = require("./routes/candidate");
const recruiterRouter = require("./routes/recruiter");
const jobRouter = require("./routes/jobs");

app.use(express.json());

app.use("/users", userRouter);
app.use("/candidate", candidateRouter);
app.use("/recruiter", recruiterRouter);
app.use("/jobs", jobRouter);

const initializeDBAndServer = () => {
  app.listen(3000, () => console.log("connected to 3000"));
  mongoose.connect(
    "mongodb+srv://srinijapatnala:Srinija12345@job-portal.0hw8oo8.mongodb.net/job-portal?retryWrites=true&w=majority&appName=job-portal",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  mongoose.set("strictQuery", false);
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("connected to db"));
};
initializeDBAndServer();
