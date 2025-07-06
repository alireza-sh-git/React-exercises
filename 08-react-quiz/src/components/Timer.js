import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);
  return <div className="timer">{secondsRemaining}</div>;
}

export default Timer;
