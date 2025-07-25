import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case "loggedIn":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "loggedOut":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error("Unknown action type...");
  }
}

export function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    try {
      if (email === FAKE_USER.email && password === FAKE_USER.password) {
        dispatch({ type: "loggedIn", payload: FAKE_USER });
      } else throw new Error("Invalid email and password");
    } catch (err) {
      console.log(err);
    }
  }
  function logout() {
    dispatch({ type: "loggedOut" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
