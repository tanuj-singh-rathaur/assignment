const express = require("express");
require("./db/mongoose");
const cors = require("cors");

const app = express();
const userRouter = require("./routers/login");
const port = 4000;

app.use(cors());

app.use(express.json());

app.get("/index", (req, res) => {
  res.send("hello");
});

app.use(userRouter);

const server = app.listen(port, () => {
  console.log("app is listening on port " + port);
});

const closeServer = () => {
  server.close(() => {
    console.log("Server closed");
  });
};

module.exports = { app, closeServer };
