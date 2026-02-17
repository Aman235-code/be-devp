const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  const userExists = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (userExists) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashPass,
    role,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(201).json({
    success: true,
    message: "User Registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
}

module.exports = {
  registerUser,
};
