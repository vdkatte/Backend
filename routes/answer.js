const express = require("express");
const router = express.Router();
const Answer = require("../Model/answer.model");
const Question = require("../Model/question.model");
const mongoose = require("mongoose");
const res = require("express/lib/response");
router.post("/", async (req, res) => {
  let data = req.body;

  data.forEach((element) => {
    element.user = new mongoose.Types.ObjectId(element.user);
  });
  console.log(data);
  try {
    await Answer.create(data);
    res.status(200).send({
      message: "Submited Succesfully",
    });
  } catch (error) {
    console.log("A Error");
    res.status(401).send(error);
  }
});
router.get("/", async (req, res) => {
  try {
    let data = await Answer.find({ activeStatus: true })
      .populate("user")
      .exec();
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});
router.get("/distinctUserDetails", async (req, res) => {
  try {
    let data = await Answer.distinct("user");
    console.log(data);
    let total = (await Question.count()) * 10;
    let finalResult = await calculateMark(data, total);
    res.status(200).send(finalResult);
  } catch (error) {
    console.log(error);
  }
});
async function calculateMark(data, total) {
  let totalMark = 0;
  let user = {};
  let startTime;
  let endTime;
  let finalResult = await data.map(async (ele) => {
    let details = await Answer.find({
      $and: [{ user: ele }, { activeStatus: true }],
    })
      .populate("user")
      .exec()
      .then((ele) => {
        user = ele[0].user;
        startTime = ele[0].time;
        endTime = ele[ele.length - 1].time;
        ele.forEach((ele) => {
          totalMark += parseInt(ele.mark);
        });
        totalMark = (totalMark / total) * 100;
      });
    return {
      user: user,
      mark: totalMark.toFixed(2),
      startTime: startTime,
      endTime: endTime,
    };
  });
  let result = Promise.all(finalResult).then((ele) => {
    return ele;
  });
  console.log(result);
  return result;
}
router.post("/reset", async (req, res) => {
  let data1 = await Answer.updateMany(
    {
      user: req.body.user,
    },
    { activeStatus: false }
  );

  console.log(data1);
  res.status(200).send({ result: "Updated Successfully" });
});
module.exports = router;
