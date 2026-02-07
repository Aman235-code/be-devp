const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const userExists = await userModel.findOne({
    email,
  });

  if (userExists) {
    return res.status(409).json({
      message: "User Already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
}

module.exports = { registerUser };
