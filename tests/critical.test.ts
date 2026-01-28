// Critical Test - Tests core game logic (winner detection)
import { describe, it, expect } from "bun:test";
import { checkWinner } from "../src/server";

describe("Critical Game Logic Tests", () => {
  it("should detect horizontal win for X", () => {
    const board = ["X", "X", "X", "", "", "", "", "", ""];
    expect(checkWinner(board)).toBe("X");
  });

  it("should detect vertical win for O", () => {
    const board = ["O", "", "", "O", "", "", "O", "", ""];
    expect(checkWinner(board)).toBe("O");
  });

  it("should detect diagonal win", () => {
    const board = ["X", "", "", "", "X", "", "", "", "X"];
    expect(checkWinner(board)).toBe("X");
  });

  it("should detect draw condition", () => {
    const board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(checkWinner(board)).toBe("draw");
  });

  it("should return null when game is in progress", () => {
    const board = ["X", "", "", "", "O", "", "", "", ""];
    expect(checkWinner(board)).toBeNull();
  });
});

// TODO: Add tests for API endpoints
// TODO: Add tests for invalid moves
