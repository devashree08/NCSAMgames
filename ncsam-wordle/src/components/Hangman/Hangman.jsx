import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sentencesData from "./hangmanSentences.json";
import "./HangmanGame.css"; // Add the CSS file you created for styling

const HangmanGame = () => {
  const [sentences, setSentences] = useState([]);
  const [currentSentence, setCurrentSentence] = useState("");
  const [displayedSentence, setDisplayedSentence] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setSentences(sentencesData.sentences);
  }, []);

  useEffect(() => {
    if (sentences.length > 0) {
      // Select a random sentence from the list
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const selectedSentence = sentences[randomIndex].toUpperCase();

      // Initialize displayedSentence with underscores for letters and spaces
      let formattedSentence = "";
      for (let i = 0; i < selectedSentence.length; i++) {
        const char = selectedSentence[i];
        if (char === " ") {
          formattedSentence += "\u00A0\u00A0"; // Add two non-breaking spaces between words
        } else {
          formattedSentence += "_";
        }
        if (i < selectedSentence.length - 1 && selectedSentence[i + 1] !== " ") {
          formattedSentence += "\u00A0"; // Add a non-breaking space between letters
        }
      }

      setCurrentSentence(selectedSentence);
      setDisplayedSentence(formattedSentence);
      setGameOver(false); // Reset game over status when a new game starts
      setGuessedLetters([]);
      setGuess("");
      setAttempts(6); // You can adjust the number of attempts as needed
    }
  }, [sentences]);

  const handleGuess = () => {
    if (!guess || gameOver) return; // Disable guessing when the game is over

    const letter = guess.toUpperCase();

    if (guessedLetters.includes(letter)) {
      toast.error("You've already guessed this letter.", { theme: "dark" });
      setGuess("");
      return;
    }

    if (currentSentence.includes(letter)) {
      // Update displayedSentence with correctly guessed letter(s)
      const newDisplayedSentence = [...displayedSentence];
      for (let i = 0; i < currentSentence.length; i++) {
        if (currentSentence[i] === letter) {
          newDisplayedSentence[i] = letter;
        }
      }
      setDisplayedSentence(newDisplayedSentence.join(""));
    } else {
      setAttempts(attempts - 1);
    }

    setGuessedLetters([...guessedLetters, letter]);
    setGuess("");
  };

  useEffect(() => {
    if (currentSentence && !gameOver) {
      // Check if the player has won
      if (!displayedSentence.includes("_")) {
        toast.success("Congratulations! You won!", { theme: "dark" });
        setGameOver(true);
      }
      // Check if the player has lost
      if (attempts === 0) {
        setGameOver(true);
      }
    }
  }, [displayedSentence, attempts, currentSentence, gameOver]);

  return (
    <div className="container">
      <h1>Hangman Game</h1>
      <div className="displayed-sentence">{displayedSentence}</div>
      <p>Attempts left: {attempts}</p>
      <input
        type="text"
        maxLength="1"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver} // Disable the input field when the game is over
      />
      <button
        onClick={handleGuess}
        disabled={gameOver} // Disable the guess button when the game is over
      >
        Guess
      </button>
      <ToastContainer
        theme="dark"
        toastClassName="custom-toast-font"
      />
      {gameOver && (
        <p className="game-over">
          {attempts === 0 ? "Game over. Refresh the page to play again." : ""}
        </p>
      )}
    </div>
  );
};

export default HangmanGame;
