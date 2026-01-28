# Tic-Tac-Toe Interview Project

A simple tic-tac-toe game built with Bun, React, and a plain text file database.

## Quick Start

```bash
bun install
bun dev
```

Visit http://localhost:3000

## Your Task

[The interviewer will give you a specific task to complete]

## Project Structure

- `src/server.ts` - Backend (API + file storage) ~150 lines
- `src/client.tsx` - Frontend (React UI) ~100 lines
- `tests/` - Test files
- `data/games.txt` - Game storage (JSON lines format)
- `index.html` - HTML entry point

## API Endpoints

- `POST /api/games` → Create new game
- `GET /api/games/:id` → Get game state
- `POST /api/games/:id/move` → Make move (body: `{position: 0-8}`)

## Run Tests

```bash
bun test
```

Expected results:

- ✅ critical.test.ts - 5 tests pass
- ✅ dummy.test.ts - 2 tests pass
- ❌ failing.test.ts - 1 test fails (intentional)

## Tech Stack

- **Bun** - Runtime and package manager
- **React** - Frontend UI
- **TypeScript** - Type safety
- **Plain text file** - Database (games.txt)

## Notes

This is a minimal, intentionally simple codebase designed for quick understanding. The code prioritizes readability over production patterns.
