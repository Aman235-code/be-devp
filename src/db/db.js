const mongoose = require("mongoose");

async function connectDb() {
  await mongoose.connect(
    "mongodb+srv://yt:htvNowmVKeJnj6Rp@cluster0.skopojj.mongodb.net/halley",
  );
  console.log("Connected to db");
}

module.exports = connectDb