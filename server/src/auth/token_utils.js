const jwt = require("jsonwebtoken");

const generateAuthToken = async function (user) {
  const secret_key = "some secret key";
  const token = jwt.sign({ _id: user._id.toString() }, secret_key);
  return token;
};

module.exports = { generateAuthToken };
