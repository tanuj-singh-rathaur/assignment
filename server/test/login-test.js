const chai = require("chai");
const expect = chai.expect;

const { userLogin } = require("../src/userLogin");

const validUsername = "validUsername";
const validPassword = "validPassword";
const inValidUsernmae = "inValidUsername";
const inValidPassword = "inValidPassword";

describe("User Login Functionality", () => {
  it("should return true for valid user credentials", () => {
    const result = login(validUsername, validPassword);
    expect(result).to.be.true;
  });

  it("should return false for invalid user credentials", () => {
    const result = login(inValidUsernmae, inValidPassword);
    expect(result).to.be.false;
  });
});
