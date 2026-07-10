import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SubjectSelection from './components/SubjectSelection.jsx';
import QuizContainer from './components/QuizContainer.jsx';
import Results from './components/Results.jsx';

import quizData from './data/questions.json';
export default function App() {
  // Theme State (Persisted in Local Storage)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('quiz-app-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });
   // Quiz States
  const [view, setView] = useState('selection'); // 'selection' | 'quiz' | 'results'
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);