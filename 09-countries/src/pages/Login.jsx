import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated]);

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </main>
  );
}
