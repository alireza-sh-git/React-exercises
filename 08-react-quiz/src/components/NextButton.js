function NextButton({
  dispatch,
  answer,
  maxPossiblePoints,
  numQuestions,
  isLastQuestion,
}) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" });
      }}
    >
      {isLastQuestion ? "finish" : "next"}
    </button>
  );
}

export default NextButton;
