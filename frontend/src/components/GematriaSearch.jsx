import { useState } from "react";
import SearchInput from "./SearchInput.jsx";
import ResultsTable from "./ResultsTable.jsx";
import ErrorDisplay from "./ErrorDisplay.jsx";

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
        `https://gematria-explorer-backend.onrender.com/api/gematria/${searchValue}`
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
    <div className="gematria-search-container">
      <h1>Búsqueda de Gematria en la Torá</h1>
      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        onSearch={handleSearch}
        loading={loading}
      />

      <ErrorDisplay error={error} />

      <ResultsTable results={results} />
    </div>
  );
};

export default GematriaSearch;
