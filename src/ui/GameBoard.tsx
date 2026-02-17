import type { GameState, GameAction } from '../engine/types';

interface GameBoardProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export function GameBoard({ state, dispatch }: GameBoardProps) {
  const handleClick = () => {
    if (state.phase === 'playing') {
      dispatch({ type: 'ADD_SCORE', amount: 1 });
    }
  };

  return (
    <div className="game-board" onClick={handleClick}>
      {state.phase === 'setup' && (
        <div className="overlay">
          <p>Click Start to begin</p>
        </div>
      )}
      
      {state.phase === 'playing' && (
        <div className="game-area">
          <p>Click to score points!</p>
        </div>
      )}
      
      {state.phase === 'ended' && (
        <div className="overlay">
          <p>Game Over!</p>
          <p>Final Score: {state.score}</p>
        </div>
      )}
    </div>
  );
}

