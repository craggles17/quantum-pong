import type { GameState, GameAction } from '../engine/types';
import { canStartGame } from '../engine/state';

interface ControlsProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export function Controls({ state, dispatch }: ControlsProps) {
  return (
    <div className="controls">
      {canStartGame(state) && (
        <button onClick={() => dispatch({ type: 'START_GAME' })}>
          Start Game
        </button>
      )}
      
      {state.phase === 'playing' && (
        <>
          <button onClick={() => dispatch({ type: 'PAUSE_GAME' })}>
            Pause
          </button>
          <button onClick={() => dispatch({ type: 'END_GAME' })}>
            End Game
          </button>
        </>
      )}
      
      {state.phase === 'paused' && (
        <button onClick={() => dispatch({ type: 'RESUME_GAME' })}>
          Resume
        </button>
      )}
      
      {state.phase === 'ended' && (
        <button onClick={() => dispatch({ type: 'RESET' })}>
          Play Again
        </button>
      )}
    </div>
  );
}

