import { useState, useEffect } from "react";

const apiKey = "1b383ab8";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `https://omdbapi.com/?s=${query}&apikey=${apiKey}`,
            { signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong with fetching the movies");
          }
          const data = await res.json();
          if (data.Response === "False")
            throw new Error("No movies found based on the search query");
          setMovies(data.Search);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.log(error.message);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
      return () => {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
