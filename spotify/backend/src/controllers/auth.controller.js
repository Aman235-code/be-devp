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
      message: "User Already Exists",
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
    message: "User Registered Successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    },
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(200).json({
    success: true,
    message: "User Logged In Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

module.exports = {
  registerUser,
  loginUser,
};
