# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TDD Dojo** is a Vue.js single-page application that provides an interactive environment for developers to practice Test-Driven Development (TDD) using a custom pseudocode language. The application runs entirely client-side and includes a lightweight pseudocode interpreter and testing framework.

## Architecture

### Core Components
- **PseudocodeInterpreter** (`src/core/pseudocode-interpreter.ts`) - Executes pseudocode functions
- **PseudocodeTestFramework** (`src/core/test-framework.ts`) - Runs tests and provides results
- **TDD Store** (`src/stores/tdd.ts`) - Pinia store managing application state and TDD workflow

### UI Components
- **TDDPractice** - Main practice interface with dual code editors
- **CodeEditor** - Simple code editor with line numbers
- **TestResults** - Displays test execution results with pass/fail status
- **WorkflowGuide** - Shows TDD workflow steps and pseudocode syntax help
- **ExerciseSelector** - Browse and load practice exercises

### Pseudocode Language
The application uses a simple pseudocode syntax:
- Functions: `FUNCTION name(params) ... RETURN value ... END`
- Variables: `SET variable = value`
- Conditionals: `IF condition THEN ... ELSE ... END`
- Tests: `TEST "description" ... ASSERT function(args) == expected ... END`

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking
- `npm run test:unit` - Run unit tests (Vitest)
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/          # Vue components
├── core/               # Core interpreter and testing logic
├── data/               # Exercise definitions
├── stores/             # Pinia stores
├── views/              # Vue router views
└── router/             # Vue router configuration
```

## Key Features

1. **Real-time TDD Workflow** - Visual indicators for Red/Green/Refactor phases
2. **Pseudocode Interpreter** - Client-side execution of simple pseudocode
3. **Exercise Library** - Pre-built coding challenges with difficulty levels
4. **Test Framework** - Custom assertion syntax for pseudocode testing
5. **Interactive UI** - Dual-pane editor with live test results

## Testing

The application includes a custom pseudocode testing framework that supports:
- `ASSERT function(args) == expected` syntax
- `EXPECT function(args) TO_BE value` syntax
- Test grouping with `TEST "description" ... END`
- Detailed error messages and test result visualization

## Deployment

The application is configured for static hosting and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Build the project with `npm run build` and serve the `dist/` folder.