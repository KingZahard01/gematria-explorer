export const fetchGematriaResults = async (value) => {
  const response = await fetch(
    `https://gematria-explorer-backend.onrender.com/api/gematria/${value}`
  );

  if (!response.ok) {
    throw new Error("No se encontraron resultados");
  }

  return await response.json();
};
