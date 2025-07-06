function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <p className="result">
      You scored {points} points out of {maxPossiblePoints} (
      {Math.ceil(percentage)}%)
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz{" "}
      </button>
    </p>
  );
}

export default FinishScreen;
