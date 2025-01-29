// config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_USERNAME = "admin";
    const MONGO_PASSWORD = "password";
    const MONGO_HOST = "localhost";
    const MONGO_PORT = "27017";
    const MONGO_DB = "gematria";

    const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

    await mongoose.connect(connectionString);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    console.error("Connection String utilizada:", error.connectionString);
    process.exit(1);
  }
};

module.exports = connectDB;
