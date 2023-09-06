const express = require("express");
const router = express.Router();
const Question = require("../Model/question.model");
const mongoose = require("mongoose");
const res = require("express/lib/response");
router.post("/", async (req, res) => {
  let data = new Question(req.body);
  try {
    await data.save();
    res.status(200).send({
      queID: data._id,
    });
  } catch (error) {
    console.log("A Error");
    res.status(401).send(error);
  }
});
router.get("/", async (req, res) => {
  let data = await Question.find();
  console.log(data);
  res.status(200).send(data);
});
router.get("/category/:cat", async (req, res) => {
  try {
    let data = await Question.find({ category: req.params.cat });
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
