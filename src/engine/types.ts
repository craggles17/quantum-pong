/**
 * Core game types.
 * Keep this file as the single source of truth for game state types.
 */

export interface GameState {
  phase: 'setup' | 'playing' | 'paused' | 'ended';
  score: number;
  currentPlayer: number;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  score: number;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' }
  | { type: 'ADD_SCORE'; amount: number }
  | { type: 'RESET' };

export interface GameConfig {
  playerCount: number;
  difficulty: 'easy' | 'normal' | 'hard';
}

