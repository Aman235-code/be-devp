const mongoose = require("mongoose");

async function connectDb() {
  await mongoose.connect(`${process.env.MONGO_URI}/project1`);
  console.log("Connected to db");
}

module.exports = connectDb;
