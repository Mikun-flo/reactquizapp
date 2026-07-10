import SVGIcon from "./SVGIcon.jsx";

export default function Results({ currentSubject, score, onPlayAgain }) {
  const totalQuestions = currentSubject?.questions?.length ?? 0;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="grid-layout">
      <div className="results-card">
        <div className="results-subject-header">
          <div className={`icon-badge ${currentSubject?.icon}`}>
            <SVGIcon name={currentSubject?.icon || "history"} />
          </div>
          <div>
            <p className="results-label">{currentSubject?.title || "Quiz"}</p>
            <p className="results-score-label">Quiz complete</p>
          </div>
        </div>

        <div>
          <div className="results-score-big">{score}</div>
          <p className="results-score-label">
            {percentage}% correct • {score} of {totalQuestions} correct
          </p>
        </div>

        <button className="btn-primary" type="button" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}
