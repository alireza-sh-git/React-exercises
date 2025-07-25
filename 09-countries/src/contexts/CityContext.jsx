import { createContext, useContext, useEffect, useReducer } from "react";
const BASE_URL = "http://localhost:8000";

const CityContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: false };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter(city, city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };
    default:
      throw new Error("Action type unknown...");
  }
}
const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

export function CityProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    fetchCities();
  }, []);

  async function fetchCities() {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: err });
    }
  }
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: err });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        createCity,
        deleteCity,
        currentCity,
        error,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
