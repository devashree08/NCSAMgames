import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WordleGame.css';

const MAX_ATTEMPTS = 6;

const WordleGame = ({ word }) => {
  const boardSize = word.length;
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [guessBoard, setGuessBoard] = useState([]);
  const [guessResult, setGuessResult] = useState([]);
  const [won, setWon] = useState(false); // Track if the game is won

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
  };
  const closeRules = () => {
    setShowRules(false);
  };

  const handleGuessSubmit = () => {
    if (won) {
      return; // If the game is already won, don't process additional guesses
    }

    if (guess.trim() === '') {
      setMessage('Please enter a valid word.');
      return;
    }

    if (attempts >= MAX_ATTEMPTS) {
      setMessage('Game over. You have reached the maximum number of attempts.');
      setGuessBoard(word.split('')); // Display the correct word
      return;
    }

    const guessArray = guess.toUpperCase().split('');
    const wordArray = word.toUpperCase().split('');

    const correctPositions = Array(boardSize).fill(false);
    const correctLetters = new Set();

    for (let i = 0; i < boardSize; i++) {
      if (guessArray[i] === wordArray[i]) {
        correctPositions[i] = true;
      } else if (wordArray.includes(guessArray[i])) {
        correctLetters.add(guessArray[i]);
      }
    }

    const guessResultItem = {
      guess: guessArray.join(''),
      correctPositions,
      correctLetters: Array.from(correctLetters),
    };

    if (guessArray.join('') === word) {
      setMessage('Congratulations! You won!');
      setWon(true);
    } else {
      setGuessResult([...guessResult, guessResultItem]);
      setGuessBoard([...guessBoard, guessArray]);
      setGuess('');
      setAttempts(attempts + 1);
    }
  };

  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS && !won) {
      setMessage('Game over. You have reached the maximum number of attempts.');
      setGuessBoard(word.split('')); // Display the correct word
    }
  }, [attempts, won, word]);

  const renderBoard = (guessArray, correctPositions, correctLetters) => {
    return (
      <div className="word-board">
        {guessArray.map((letter, index) => (
          <span
            key={index}
            className={`letter ${
              correctPositions[index]
                ? 'correct'
                : correctLetters.includes(letter)
                ? 'correct-wrong'
                : ''
            }`}
          >
            {letter}
          </span>
        ))}
      </div>
    );
  };

  const renderGuesses = () => {
    return guessResult.map((guessItem, index) => (
      <div key={index}>
        {renderBoard(
          guessItem.guess.split(''),
          guessItem.correctPositions,
          guessItem.correctLetters
        )}
      </div>
    ));
  };


  return (
    <div className="wordle-game">
    <div className="rules-icon" onClick={toggleRules}>
      <span className="info-icon">i</span>
    </div>
    {showRules && (
      <div className="rules-popup">
        <div className="popup-content">
          <button className="close-button" onClick={closeRules}>
            X
          </button>
          <h2>Rules:</h2>
          <ul>
            <li>Type in a word and press enter.</li>
            <li>All guesses must be real English words.</li>
            <li>After each guess, each correct letter turns green.</li>
            <li>Each correct letter in the wrong place turns yellow.</li>
            <li>Incorrect letters turn gray.</li>
            <li>Letters can be used more than once.</li>
            <li>Guess the correct word in 6 tries or less to win.</li>
            <li>This game can only be played once per day.</li>
          </ul>
        </div>
      </div>
    )}
      <h1>Wordle Game</h1>
      <p>Guess the word in {MAX_ATTEMPTS - attempts} attempts.</p>
      {attempts >= MAX_ATTEMPTS || won ? (
        <div className="final-board">
          {renderBoard(word.split(''), Array(boardSize).fill(true), [])}
        </div>
      ) : (
        renderBoard(
          guessBoard[guessBoard.length - 1] || Array(boardSize).fill(''),
          guessResult[guessResult.length - 1]?.correctPositions || [],
          guessResult[guessResult.length - 1]?.correctLetters || []
        )
      )}
      <input
        type="text"
        value={guess}
        onChange={handleGuessChange}
        maxLength={boardSize}
      />
      <button onClick={handleGuessSubmit}>Submit Guess</button>
      <p>{message}</p>
      <div className="guess-history">
        <h2>Guess History</h2>
        {renderGuesses()}
      </div>
    </div>
  );
};

WordleGame.propTypes = {
  word: PropTypes.string.isRequired,
};

export default WordleGame;
