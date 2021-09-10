const express = require("express");

const router = express.Router();

const Task = require("./model");

router.get("/", (req, res, next) => {
  Task.getTasks()
    .then((task) => {
      res.json(task);
    })
    .catch(next);
});
router.post("/", (req, res, next) => {
  const data = req.body;
  console.log(data)
  Task.insert(data)
    .then((newPro) => {
      res.json(newPro);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    sageAdvice: "Finding the real error is 90% of the bug fix",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;