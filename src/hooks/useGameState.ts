import { useReducer, useMemo } from 'react';
import { createInitialState, gameReducer } from '../engine/state';
import type { GameState, GameAction } from '../engine/types';

export interface UseGameStateReturn {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export function useGameState(): UseGameStateReturn {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);
  
  return useMemo(() => ({ state, dispatch }), [state]);
}

