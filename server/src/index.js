const express = require("express");
const cors = require("cors");

const app = express();
const userRouter = require("./routers/users.controller");
const adminRouter = require("./routers/admin.controller");
const publicRouter = require("./routers/public.controller");
const port = 4000;

app.use(cors());

app.use(express.json());

app.get("/index", (req, res) => {
  res.send("hello");
});

app.use(userRouter);
app.use(adminRouter);
app.use(publicRouter);

const server = app.listen(port, () => {
  console.log("app is listening on port " + port);
});

const closeServer = () => {
  server.close(() => {
    console.log("Server closed");
  });
};

module.exports = { app, closeServer };
