import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SubjectSelection from './components/SubjectSelection.jsx';
import QuizContainer from './cmponents/QuizContainer.jsx';
import Results from './components/Results.jsx';
import quizData from './components/questions.json';
export default function App() {
  // Theme State (Persisted in Local Storage)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("quiz-app-theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme || (prefersDark ? "dark" : "light");
  });
  // Quiz States
  const [view, setView] = useState("selection"); // 'selection' | 'quiz' | 'results'
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sync HTML theme attribute on changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("quiz-app-theme", theme);
  }, [theme]);
  // Toggle between Light and Dark mode
  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  // Select Subject & Initialize Quiz State
  const handleSelectSubject = (subject) => {
    setCurrentSubject(subject);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setErrorMessage(null);
    setView("quiz");
  };
  // Submit Answer & Progression handler
  const handleSubmitAnswer = () => {
    const questions = currentSubject.questions;
    const currentQuestion = questions[currentQuestionIndex];
    if (!isAnswerSubmitted) {
      // 1. Submit mode - validate selection
      if (!selectedAnswer) {
        setErrorMessage("Please select an answer");
        return;
      }
      setIsAnswerSubmitted(true);
      const isCorrect = selectedAnswer === currentQuestion.answer;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
    } else {
      // 2. Next Question mode - transition state
      const nextIdx = currentQuestionIndex + 1;
      if (nextIdx < questions.length) {
        setCurrentQuestionIndex(nextIdx);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
      } else {
        setView("results");
      }
    }
  };
  // Go Back Button Navigation (Resets quiz state and returns to selection view)
  const handleGoBack = () => {
    setCurrentSubject(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setErrorMessage(null);
    setView("selection");
  };
  // Replay Quiz category selector
  const handlePlayAgain = () => {
    handleGoBack();
  };
  return (
    <>
      {/* Background patterns wrapper */}
      <div className="bg-wrapper" aria-hidden="true">
        <div className="bg-pattern bg-pattern-top-left"></div>
        <div className="bg-pattern bg-pattern-bottom-right"></div>
      </div>
      <div className="app-container">
        {/* Skip to Main Content Link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* Global Header */}
        <Header
          currentSubject={currentSubject}
          view={view}
          onGoBack={handleGoBack}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />
        {/* Main Content landmarks */}
        <main id="main-content" className="main-content">
          {view === "selection" && (
            <SubjectSelection
              quizzes={quizData.quizzes}
              onSelectSubject={handleSelectSubject}
            />
          )}
          {view === "quiz" && (
            <QuizContainer
              currentSubject={currentSubject}
              currentQuestionIndex={currentQuestionIndex}
              selectedAnswer={selectedAnswer}
              isAnswerSubmitted={isAnswerSubmitted}
              onSubmitAnswer={handleSubmitAnswer}
              onSelectAnswer={setSelectedAnswer}
              errorMessage={errorMessage}
              onClearErrorMessage={() => setErrorMessage(null)}
            />
          )}
          {view === "results" && (
            <Results
              currentSubject={currentSubject}
              score={score}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </main>
      </div>
    </>
  );
}
