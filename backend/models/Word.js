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
  },
  book: {
    type: String,
    required: true,
  },
  chapter: {
    type: Number,
    required: true,
  },
  verse: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Word", wordSchema, "words");
