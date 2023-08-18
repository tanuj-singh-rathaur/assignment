const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://tanuj:tanuj@cluster0.1tjni.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
