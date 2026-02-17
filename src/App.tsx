import { useState } from 'react';
import { GameBoard } from './ui/GameBoard';
import { Controls } from './ui/Controls';
import { useGameState } from './hooks/useGameState';

export function App() {
  const { state, dispatch } = useGameState();
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Quantum Pong</h1>
        <div className="score">Score: {state.score}</div>
      </header>
      
      <main className="game-container">
        <GameBoard state={state} dispatch={dispatch} />
      </main>
      
      <footer className="app-footer">
        <Controls state={state} dispatch={dispatch} />
      </footer>
    </div>
  );
}
