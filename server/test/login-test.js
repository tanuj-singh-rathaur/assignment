const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

const { app, closeServer } = require("../src/index");

describe("User Login API", () => {
  after((done) => {
    closeServer(done);
  });

  it("should return user and token on successful login", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: "test@gmail.com",
        password: "dummy123",
      })
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);

        expect(response.body).to.have.property("user");
        expect(response.body).to.have.property("token");
        done();
      });
  });

  it("should return 400 on invalid login", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: "invalid@example.com",
        password: "wrongpassword",
      })
      .expect(400)
      .end((err, response) => {
        if (err) return done(err);

        expect(response.body).to.eql({});
        done();
      });
  });
});
