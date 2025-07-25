import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogOut() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default User;

/*

4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
