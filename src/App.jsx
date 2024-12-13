import React, { useState, useEffect } from "react";
import './App.css';

const TypingSpeedTest = () => {
  const sampleTexts = [
    "React is a JavaScript library for building user interfaces.",
    "A journey of a thousand miles begins with a single step.",
    "Life is what happens when you're busy making other plans.",
    "The only way to do great work is to love what you do."
  ];

  const [textToType, setTextToType] = useState(getRandomText());
  const [inputText, setInputText] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // Timer in seconds
  const [isGameActive, setIsGameActive] = useState(false);
  const [results, setResults] = useState({ wpm: 0, accuracy: 0 });

  // Random Text Generator
  function getRandomText() {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    return sampleTexts[randomIndex];
  }

  // Timer Logic
  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      calculateResults();
      setIsGameActive(false);
    }
  }, [isGameActive, timeLeft]);

  // Calculate WPM and Accuracy
  const calculateResults = () => {
    const wordsTyped = inputText.trim().split(" ").length;
    const correctWords = inputText
      .trim()
      .split(" ")
      .filter((word, index) => word === textToType.split(" ")[index]).length;

    const accuracy = (correctWords / textToType.split(" ").length) * 100;
    setResults({ wpm: wordsTyped, accuracy: Math.round(accuracy) });
  };

  // Start Game
  const startGame = () => {
    setIsGameActive(true);
    setInputText("");
    setTimeLeft(30);
    setTextToType(getRandomText());
    setResults({ wpm: 0, accuracy: 0 });
  };

  return (
    <div className="app">
      <h1 className="title">Typing Speed Test</h1>
      <div className="game-container">
        <p className="text-to-type">{textToType}</p>
        <textarea
          disabled={!isGameActive}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="5"
          className="input-box"
        />
        <div className="button-container">
          <button className="start-btn" onClick={startGame}>
            {isGameActive ? "Restart Game" : "Start Game"}
          </button>
        </div>
        <h3 className="timer">Time Left: {timeLeft}s</h3>
        {!isGameActive && timeLeft === 0 && (
          <div className="results">
            <h3>Results:</h3>
            <p>WPM: {results.wpm}</p>
            <p>Accuracy: {results.accuracy}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingSpeedTest;
