const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("age must not be negative");
    },
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error("password cannot contain password");
    },
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.AUTH_SECRET_KEY
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = user.password == password;

  if (!isMatch) {
    return null;
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
