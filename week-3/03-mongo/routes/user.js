const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course, Admin } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Create a new Admin
  await User.create({
    username: username,
    password: password,
  });
  res.json({
    message: "User Created Successfully",
  });
});

router.get("/courses", async (req, res) => {
  const response = await Course.find({});
  res.json({
    Course: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCource: courseId,
      },
    }
  );
  res.json({
    mag: "purchased Complete",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username,
  });
  console.log(user.purchasedCource);
  const course = await Course.find({
    _id: {
      $in: user.purchasedCource,
    },
  });
  res.json({
    msg: course,
  });
});

module.exports = router;
