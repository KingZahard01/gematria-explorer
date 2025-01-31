// models/Word.js
const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  gematriaValue: {
    type: Number,
    required: true,
    index: true,
  },
  word: {
    type: String,
    required: true,
    trim: true, // Eliminar espacios en blanco al inicio y al final
    minLength: 1, // Mínimo 1 caracter
  },
  book: {
    type: String,
    required: true,
  },
  chapter: {
    type: Number,
    required: true,
    min: 1, // Asegurar que el capítulo sea mayor a 0
  },
  verse: {
    type: Number,
    required: true,
    min: 1, // Asegurar que el versículo sea mayor a 0
  },
});

module.exports = mongoose.model("Word", wordSchema, "words");
