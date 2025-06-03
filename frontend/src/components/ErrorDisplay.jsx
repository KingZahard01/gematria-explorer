const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return <p className="error-message">{error}</p>;
};

export default ErrorDisplay;
