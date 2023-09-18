import { useState } from 'react'
import './App.css'
import wordsData from './components/Wordle/words.json';
import WordleGame from './components/Wordle/Wordle';
import HangmanGame from './components/Hangman/Hangman';
import GameSelector from "./components/GameSelector/GameSelector"; // Import the GameSelector component
import { HashRouter as Router, Route, Layout } from 'react-router-dom';

const words = wordsData.words;
const randomWord = words[Math.floor(Math.random() * words.length)];


function App() {

  return (
    <>
    
    <Router>
    <div className="App">
    <Layout>
      <Route exact path="/hangman" render={() => <HangmanGame/>}>
            <GameSelector />
          </Route>
          <Route exact path="/wordle" render={() => <WordleGame/>}>
            <GameSelector />
          </Route>

        </Layout>
      </div>
    </Router>
    </>
  )
}

export default App
