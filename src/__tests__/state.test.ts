import { describe, it, expect } from 'vitest';
import { createInitialState, gameReducer, canStartGame, isGameOver } from '../engine/state';

describe('createInitialState', () => {
  it('creates state in setup phase', () => {
    const state = createInitialState();
    expect(state.phase).toBe('setup');
  });

  it('starts with zero score', () => {
    const state = createInitialState();
    expect(state.score).toBe(0);
  });

  it('creates specified number of players', () => {
    const state = createInitialState({ playerCount: 4 });
    expect(state.players).toHaveLength(4);
  });

  it('defaults to 1 player', () => {
    const state = createInitialState();
    expect(state.players).toHaveLength(1);
  });
});

describe('gameReducer', () => {
  it('START_GAME transitions to playing', () => {
    const state = createInitialState();
    const next = gameReducer(state, { type: 'START_GAME' });
    expect(next.phase).toBe('playing');
  });

  it('PAUSE_GAME transitions to paused', () => {
    const state = { ...createInitialState(), phase: 'playing' as const };
    const next = gameReducer(state, { type: 'PAUSE_GAME' });
    expect(next.phase).toBe('paused');
  });

  it('ADD_SCORE increases score', () => {
    const state = createInitialState();
    const next = gameReducer(state, { type: 'ADD_SCORE', amount: 10 });
    expect(next.score).toBe(10);
  });

  it('RESET returns to initial state', () => {
    const state = { ...createInitialState(), score: 100, phase: 'ended' as const };
    const next = gameReducer(state, { type: 'RESET' });
    expect(next.score).toBe(0);
    expect(next.phase).toBe('setup');
  });
});

describe('canStartGame', () => {
  it('returns true when in setup with players', () => {
    const state = createInitialState();
    expect(canStartGame(state)).toBe(true);
  });

  it('returns false when already playing', () => {
    const state = { ...createInitialState(), phase: 'playing' as const };
    expect(canStartGame(state)).toBe(false);
  });
});

describe('isGameOver', () => {
  it('returns true when phase is ended', () => {
    const state = { ...createInitialState(), phase: 'ended' as const };
    expect(isGameOver(state)).toBe(true);
  });

  it('returns false when playing', () => {
    const state = { ...createInitialState(), phase: 'playing' as const };
    expect(isGameOver(state)).toBe(false);
  });
});

