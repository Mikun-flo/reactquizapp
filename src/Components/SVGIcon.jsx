import React from "react";
import SVGIcon from "./SVGIcon.jsx";
export default function SubjectSelection({ quizzes, onSelectSubject }) {
  return (
    <div className="grid-layout">
      {/* Intro Left Column */}
      <div className="intro-column">
        <h1 className="intro-title">
          Welcome to the <br />
          <span>Frontend Quiz by Mikun!</span>
        </h1>
        <p className="intro-subtitle">Pick a subject to get started.</p>
      </div>
      {/* Subjects list Right Column */}
      <div
        className="list-column"
        role="group"
        aria-label="Quiz subjects selection"
      >
        {quizzes.map((quiz) => (
          <button
            key={quiz.title}
            className="card-item subject-btn"
            onClick={() => onSelectSubject(quiz)}
            type="button"
          >
            <div className={`icon-badge ${quiz.icon}`}>
              <SVGIcon name={quiz.icon} />
            </div>
            <span>{quiz.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
