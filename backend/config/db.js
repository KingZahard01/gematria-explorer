// config/database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  // Validar si la variable de entorno está definida
  if (!process.env.MONGODB_URI) {
    console.error("No se ha definido la variable de entorno MONGODB_URI");
    process.exit(1);
  }

  try {
    const connectionString = process.env.MONGODB_URI;

    // Conexión a MongoDB
    await mongoose.connect(connectionString);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
