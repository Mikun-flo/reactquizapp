import { useRef, useEffect } from "react";
import SVGIcon from "./SVGIcon.jsx";
const OPTION_LABELS = ["A", "B", "C", "D"];
export default function QuizContainer({
  currentSubject,
  currentQuestionIndex,
  selectedAnswer,
  isAnswerSubmitted,
  onSubmitAnswer,
  onSelectAnswer,
  errorMessage,
  onClearErrorMessage,
}) {
  const questions = currentSubject.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const buttonRefs = useRef([]);
  // Reset references array when question index changes
  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(
      0,
      currentQuestion.options.length,
    );
  }, [currentQuestionIndex, currentQuestion]);
  // Calculate progress bar width
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  // Handle keyboard arrow navigation (WAI-ARIA radiogroup standards)
  const handleKeyDown = (e, index) => {
    if (isAnswerSubmitted) return;
    let targetIdx = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      targetIdx = (index + 1) % currentQuestion.options.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      targetIdx =
        (index - 1 + currentQuestion.options.length) %
        currentQuestion.options.length;
    }
    if (targetIdx !== -1) {
      buttonRefs.current[targetIdx].focus();
      onSelectAnswer(currentQuestion.options[targetIdx]);
      onClearErrorMessage();
    }
  };
  return (
    <div className="grid-layout">
      {/* Left Column: Progress & Question text */}
      <div className="question-progress-container">
        <div>
          <div className="question-counter">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <h2 className="question-text">{currentQuestion.question}</h2>
        </div>
        <div className="progress-bar-container" aria-label="Progress bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      {/* Right Column: Choices list & Submit Action */}
      <div className="list-column">
        <div
          className="options-radio-group"
          role="radiogroup"
          aria-label="Multiple choice options"
        >
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === currentQuestion.answer;
            let cardClass = "card-item option-card";
            if (isSelected) cardClass += " selected";
            if (isAnswerSubmitted) {
              cardClass += " disabled";
              if (isCorrectAnswer) {
                cardClass += " correct";
              } else if (isSelected) {
                cardClass += " incorrect";
              }
            }
            return (
              <button
                key={option}
                ref={(el) => (buttonRefs.current[idx] = el)}
                className={cardClass}
                role="radio"
                aria-checked={isSelected}
                onClick={() => {
                  if (isAnswerSubmitted) return;
                  onSelectAnswer(option);
                  onClearErrorMessage();
                }}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                type="button"
              >
                <span className="option-letter">{OPTION_LABELS[idx]}</span>
                <span className="option-text">{option}</span>
                <SVGIcon
                  name="correct"
                  className="status-icon status-icon-correct"
                />
                <SVGIcon
                  name="incorrect"
                  className="status-icon status-icon-incorrect"
                />
              </button>
            );
          })}
        </div>
        <button className="btn-primary" onClick={onSubmitAnswer} type="button">
          {isAnswerSubmitted ? "Next question" : "Submit answer"}
        </button>
        <div
          className={`error-message-container ${errorMessage ? "visible" : ""}`}
          aria-live="assertive"
        >
          <SVGIcon name="error" />
          <span>{errorMessage || "Please select an answer"}</span>
        </div>
      </div>
    </div>
  );
}
