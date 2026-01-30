import { describe, it, expect } from "bun:test";
import { checkWinner } from "../src/server";

describe("Tic-Tac-Toe Game Tests", () => {
  it("should detect horizontal win in top row", () => {
    const board = ["X", "X", "X", "", "", "", "", "", ""];
    expect(checkWinner(board)).toBe("X");
  });

  it("should detect diagonal win from top-left to bottom-right", () => {
    const board = ["O", "", "", "", "O", "", "", "", "O"];
    expect(checkWinner(board)).toBe("O");
  });

  it("should verify board is an array", () => {
    const board = ["", "", "", "", "", "", "", "", ""];
    expect(Array.isArray(board)).toBe(true);
  });

  it("should detect vertical win in first column", () => {
    const board = ["X", "", "", "X", "", "", "X", "", ""];
    expect(checkWinner(board)).toBe("O");
  });
});
