const fs = require("fs");
const path = require("path");

// Mapa de valores numéricos de las letras hebreas
const hebrewGematria = {
  א: 1,
  ב: 2,
  ג: 3,
  ד: 4,
  ה: 5,
  ו: 6,
  ז: 7,
  ח: 8,
  ט: 9,
  י: 10,
  כ: 20,
  ל: 30,
  מ: 40,
  נ: 50,
  ס: 60,
  ע: 70,
  פ: 80,
  צ: 90,
  ק: 100,
  ר: 200,
  ש: 300,
  ת: 400,
  ך: 20,
  ם: 40,
  ן: 50,
  ף: 80,
  ץ: 90, // Formas finales
};

// Función para calcular el valor guemátrico de una palabra
const calculateGematria = (word) => {
  return [...word].reduce((sum, char) => {
    return sum + (hebrewGematria[char] || 0);
  }, 0);
};

// Función para procesar un archivo JSON y recopilar información
const processFile = (filePath, result) => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  const { book, text } = JSON.parse(fileData);

  text.forEach(({ chapter, verses }, chapterIndex) => {
    verses.forEach((verse, verseIndex) => {
      // Dividir el versículo en palabras
      const words = verse.split(" ");

      words.forEach((word) => {
        const gematriaValue = calculateGematria(word);

        // Si el valor no existe en el resultado, inicializarlo
        if (!result[gematriaValue]) {
          result[gematriaValue] = [];
        }

        // Agregar la palabra con su ubicación
        result[gematriaValue].push({
          word,
          book,
          chapter: chapter || chapterIndex + 1,
          verse: verseIndex + 1,
        });
      });
    });
  });
};

// Función principal para procesar todos los archivos en una carpeta
const analyzeTorah = (directory) => {
  const result = {};

  // Leer todos los archivos JSON en la carpeta
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json"));

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    console.log(`Procesando archivo: ${file}`); // Log para confirmar el archivo procesado
    processFile(filePath, result);
  });

  return result;
};

// Función para guardar el resultado en un archivo JSON
const saveResult = (result, outputPath) => {
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
  console.log(`Resultado guardado en: ${outputPath}`);
};

// Directorio donde están los archivos JSON
const dataDirectory = path.join(__dirname, "../data");
const outputFile = path.join(__dirname, "../output/gematria_analysis.json");

// Analizar la Torah
const analysisResult = analyzeTorah(dataDirectory);

// Guardar el resultado
saveResult(analysisResult, outputFile);
