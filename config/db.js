const mongoose = require("mongoose");


function connectDB() {
  const url = "mongodb://127.0.0.1/social_db";

  try {
    mongoose.connect(url, {});
    console.log("DB connected");
  } catch (err) {
    console.error(err.message);
    console.log("Error: Database connection failed");
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}

module.exports = { connectDB };

