const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/spotify`);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDb;
