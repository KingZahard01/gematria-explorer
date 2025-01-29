// config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_USERNAME = "juanjose10312";
    const MONGO_PASSWORD = "nA9WBOLjM6CnJ4HW";
    const MONGO_HOST = "mondongo.m2iep.mongodb.net";
    const MONGO_DB = "gematria";

    const connectionString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    console.error("Connection String utilizada:", error.connectionString);
    process.exit(1);
  }
};

module.exports = connectDB;
