const express = require("express");
const router = express.Router();
const User = require("../Model/user.model");
const mongoose = require("mongoose");
router.post("/", async (req, res) => {
  let user = new User(req.body);
  try {
    let user1 = await User.find({ userName: req.body.userName });
    console.log(user1);
    if (user1.length) {
      res.status(200).send({ message: "User Name already present" });
      return;
    }
    await user.save();
    res.status(200).send({
      UserID: user._id,
      userName: user.fullName,
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    let user = await User.find({ userName: req.body.userName });
    console.log(user);
    if (!user.length) {
      res.status(200).send({ message: "Invalid User Name" });
    }
    if (user[0].password == req.body.password) {
      res.status(200).send({
        UserID: user[0]._id,
        message: "Login Succesfully",
        userName: user[0].fullName,
        role: user[0].role,
      });
    } else {
      res.status(200).send({ message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
