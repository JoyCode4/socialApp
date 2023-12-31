const mongoose = require("mongoose");

// **It is My Logic to connect mongodb
const db = main();

async function main() {
  try {
    // put only 127.0.0.1:27017 don't put localhost
    await mongoose.connect(process.env.MongoUrl);
    console.log("MongoDB is Connected Successfully");
  } catch (err) {
    console.log("Error in Connecting MongoDB: " + err.message);
  }
}

// **Sir's Logic to connect mongodb
// mongoose.connect("mongodb://127.0.0.1:27017/socialApp")

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

// db.once("open", function() {
//   console.log("Connected to Database :: MongoDB");
// });

module.exports = db;
