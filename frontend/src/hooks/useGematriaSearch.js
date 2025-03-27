import { useState } from "react";
import { fetchGematriaResults } from "../utils/api";

export const useGematriaSearch = () => {
  const [state, setState] = useState({
    searchValue: "",
    results: [],
    error: "",
    loading: false,
  });

  const handleSearch = async () => {
    if (!state.searchValue) {
      setState((prev) => ({
        ...prev,
        error: "Por favor ingresa un valor numérico",
      }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true, error: "" }));
      const data = await fetchGematriaResults(state.searchValue);
      setState((prev) => ({ ...prev, results: data, error: "" }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message, results: [] }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const updateSearchValue = (value) => {
    setState((prev) => ({ ...prev, searchValue: value }));
  };

  return { ...state, handleSearch, updateSearchValue };
};
