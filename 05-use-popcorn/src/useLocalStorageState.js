import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedData = localStorage.getItem("watched");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      return Array.isArray(parsed) ? parsed : initialState;
    } else return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
