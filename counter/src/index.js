const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

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

// Función para guardar los datos en MongoDB
const saveToMongoDB = async (result) => {
  const uri = "mongodb://admin:password@localhost:27017"; // Cambia esto si usas MongoDB Atlas u otra configuración
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    const database = client.db("gematria");
    const collection = database.collection("words");

    // Eliminar datos existentes para evitar duplicados (opcional)
    await collection.deleteMany({});

    // Preparar documentos para insertar
    const documents = [];
    for (const [gematriaValue, words] of Object.entries(result)) {
      words.forEach((wordEntry) => {
        documents.push({
          gematriaValue: parseInt(gematriaValue, 10),
          word: wordEntry.word,
          book: wordEntry.book,
          chapter: wordEntry.chapter,
          verse: wordEntry.verse,
        });
      });
    }

    // Insertar en la base de datos
    const insertResult = await collection.insertMany(documents);
    console.log(
      `Insertados ${insertResult.insertedCount} documentos en la colección.`
    );
  } catch (error) {
    console.error("Error al guardar en MongoDB:", error);
  } finally {
    await client.close();
    console.log("Conexión con MongoDB cerrada");
  }
};

// Directorio donde están los archivos JSON
const dataDirectory = path.join(__dirname, "../data");

// Analizar la Torah
const analysisResult = analyzeTorah(dataDirectory);

// Guardar en MongoDB
saveToMongoDB(analysisResult);
