const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:  {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
});

const userModel = mongoose.model("user", userSchema);


module.exports = userModel;

