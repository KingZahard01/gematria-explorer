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

// Función para procesar un archivo JSON y agregar valores únicos
const processFile = (filePath, uniqueValues) => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  const { text } = JSON.parse(fileData);

  // Recorrer cada grupo de versículos
  text.forEach((paragraph) => {
    paragraph.forEach((verse) => {
      // Dividir el versículo en palabras
      const words = verse.split(" ");

      // Calcular el valor de cada palabra y agregarlo al conjunto
      words.forEach((word) => {
        const gematriaValue = calculateGematria(word);
        uniqueValues.add(gematriaValue);
      });
    });
  });
};

// Función principal para procesar todos los archivos en una carpeta
const countUniqueGematriaValues = (directory) => {
  const uniqueValues = new Set();

  // Leer todos los archivos JSON en la carpeta
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json"));

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    console.log(`Procesando archivo: ${file}`); // Log para confirmar el archivo procesado
    processFile(filePath, uniqueValues);
  });

  return uniqueValues.size; // Número de valores únicos
};

// Directorio donde están los archivos JSON
const dataDirectory = path.join(__dirname, "../data");

// Contar los valores únicos en todos los archivos
const uniqueCount = countUniqueGematriaValues(dataDirectory);
console.log(`Cantidad total de valores únicos de guematria: ${uniqueCount}`);
