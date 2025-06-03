const ResultsTable = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Valor</th>
          <th>Palabra</th>
          <th>Libro</th>
        </tr>
      </thead>
      <tbody>
        {results.map((item, index) => (
          <tr key={index}>
            <td>{item.gematriaValue}</td>
            <td>{item.word}</td>
            <td>
              {item.book} {item.chapter}:{item.verse}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
