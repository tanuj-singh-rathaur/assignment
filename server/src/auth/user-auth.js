const { user, sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const auth = async (req, res, next) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "some secret key");
    let existingUser = await user.findOne({
      where: {
        id: decoded.id,
        token: token,
      },
    });

    console.log(token);
    console.log(existingUser);
    if (!existingUser) throw new Error();

    req.user = existingUser;
    req.token = token;

    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
    console.log(e);
  }
};
module.exports = auth;
