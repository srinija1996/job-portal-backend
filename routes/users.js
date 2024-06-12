const express = require("express");
const User = require("../models/User");
const route = express.Router();
route.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch {
    res.status(401).send({ message: err.message });
  }
});
route.post("/add-user", async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;
    const isUserExisted = await User.findOne({ email });
    if (isUserExisted !== null) {
      res.status(401).send("User already existed");
    } else {
      const user = new User({
        firstName,
        lastName,
        age,
        email,
        password,
      });
      const newUser = await user.save();
      res.send(newUser.id);
    }
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});
route.put("/update-user/:id", async (req, res) => {
    try{
        const {id}=req.params
        const user= await User.findOneAndUpdate({_id:id},{$set:req.body})
      res.send('User updated successfully')
    }
    catch(err){
        res.status(401).send({ message: err.message });
    }
});
route.delete("/del-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user === null) {
      res.status(401).send("User not existed in DB");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});
module.exports = route;
