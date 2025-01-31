// controllers/wordController.js
const Word = require("../models/Word");

const wordController = {
  // Obtener palabras por valor de gematría
  getByGematriaValue: async (req, res) => {
    try {
      const gematriaValue = parseInt(req.params.value);

      if (isNaN(gematriaValue)) {
        return res.status(400).json({
          message: "El valor de gematría debe ser un número",
        });
      }

      const words = await Word.find({ gematriaValue });

      if (words.length === 0) {
        return res.status(404).json({
          message: "No se encontraron palabras con ese valor de gematría",
        });
      }

      res.json(words);
    } catch (error) {
      res.status(500).json({
        message: "Error al buscar palabras",
        error: error.message,
      });
    }
  },

  // Obtener todas las palabras
  // getAllWords: async (req, res) => {
  //   try {
  //     const words = await Word.find();
  //     res.json(words);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Error al obtener las palabras",
  //       error: error.message,
  //     });
  //   }
  // },
};

module.exports = wordController;
