function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""}
          ${
            answer !== null
              ? question.correctOption === i
                ? "correct"
                : "wrong"
              : ""
          }
          `}
          key={option}
          disabled={answer !== null}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: i });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
