const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { generateAuthToken } = require("../auth/token_utils");

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (!user) {
      return res.status(400).send({ message: "Unable to Login!" });
    }

    const token = await generateAuthToken(user);

    return res.send({ user, token });
  } catch (e) {
    return res.status(400).send(e);
    console.log(e);
  }
});

router.post("/users/login/insertDummy", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send(error);
    console.log(error);
  }
});
module.exports = router;
