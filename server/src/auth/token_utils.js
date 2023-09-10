const jwt = require("jsonwebtoken");

const generateAuthToken = async function (user) {
  console.log(user);
  const secret_key = "some secret key";
  const token = jwt.sign({ id: user.id }, secret_key);
  return token;
};

module.exports = { generateAuthToken };
