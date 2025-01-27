import { useState } from "react";

const GematriaSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchValue) {
      setError("Por favor ingresa un valor numérico");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `http://localhost:3000/api/gematria/${searchValue}`
      );

      if (!response.ok) {
        throw new Error("No se encontraron resultados");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Búsqueda de Gematría en la Torá</h1>

      <div>
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Ingresa un valor numérico"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {error && <p>{error}</p>}

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Palabra</th>
              <th>Libro</th>
              <th>Capítulo</th>
              <th>Versículo</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index}>
                <td>{item.gematriaValue}</td>
                <td>{item.word}</td>
                <td>{item.book}</td>
                <td>{item.chapter}</td>
                <td>{item.verse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GematriaSearch;
