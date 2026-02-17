# Quantum Pong - Agent Coordination

## Current Phase: Setup

## Target Branch: main
## Feature Branch: (none)

---

## Project Overview

A quantum mechanics pong game with wavefunction physics

## Architecture

```
quantum_pong/
├── src/
│   ├── engine/        # Pure game logic (no React)
│   │   ├── types.ts   # Type definitions
│   │   └── state.ts   # State management
│   ├── hooks/         # React hooks
│   ├── ui/            # React components
│   └── styles/        # CSS
├── tests/
│   └── e2e/           # Playwright tests
├── Makefile           # Build commands
└── package.json
```

## Key Files

| File | Purpose |
|------|---------|
| `src/engine/types.ts` | GameState, Actions, Config types |
| `src/engine/state.ts` | Pure reducer and state helpers |
| `src/App.tsx` | Root component |
| `src/ui/GameBoard.tsx` | Main game area |
| `src/ui/Controls.tsx` | Game controls |

## Commands

```bash
make dev          # Start dev server
make test         # Run unit tests
make test-e2e     # Run E2E tests
make build        # Production build
make deploy       # Deploy to Netlify
```

## Testing

- Unit tests: `src/**/*.test.ts` (Vitest)
- E2E tests: `tests/e2e/*.spec.ts` (Playwright)

## Next Steps

1. [ ] Define game-specific types in `engine/types.ts`
2. [ ] Implement game logic in `engine/state.ts`
3. [ ] Add UI components for gameplay
4. [ ] Write tests for core logic
5. [ ] Add visual regression tests
