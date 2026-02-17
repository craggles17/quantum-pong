/**
 * Pure game state management.
 * All functions are pure - no side effects.
 */

import type { GameState, GameAction, GameConfig } from './types';

export function createInitialState(config?: Partial<GameConfig>): GameState {
  const playerCount = config?.playerCount ?? 1;
  
  return {
    phase: 'setup',
    score: 0,
    currentPlayer: 0,
    players: Array.from({ length: playerCount }, (_, i) => ({
      id: `player-${i}`,
      name: `Player ${i + 1}`,
      score: 0,
    })),
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, phase: 'playing' };
    
    case 'PAUSE_GAME':
      return { ...state, phase: 'paused' };
    
    case 'RESUME_GAME':
      return { ...state, phase: 'playing' };
    
    case 'END_GAME':
      return { ...state, phase: 'ended' };
    
    case 'ADD_SCORE':
      return { ...state, score: state.score + action.amount };
    
    case 'RESET':
      return createInitialState();
    
    default:
      return state;
  }
}

export function isGameOver(state: GameState): boolean {
  return state.phase === 'ended';
}

export function canStartGame(state: GameState): boolean {
  return state.phase === 'setup' && state.players.length > 0;
}

