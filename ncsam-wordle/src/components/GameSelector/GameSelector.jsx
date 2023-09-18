// GameSelector.js
import React from "react";
import { Link } from "react-router-dom";
import "./GameSelector.css"; // Import your CSS file for styling

const GameSelector = () => {
  return (
    <div className="game-selector">
      <h2>Choose a Game:</h2>
      <div className="game-buttons">
        <Link to="/hangman">
          <button className="game-button">Hangman</button>
        </Link>
        <Link to="/wordle">
          <button className="game-button">Wordle</button>
        </Link>
      </div>
    </div>
  );
};

export default GameSelector;
