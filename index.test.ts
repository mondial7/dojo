import { ticTacToe } from ".";

/**
 * https://kata-log.rocks/tic-tac-toe-kata
 * 
 * In random order:
    - a game is over when all fields in a row are taken by a player
    - players take turns taking fields until the game is over
    - a game is over when all fields in a diagonal are taken by a player
    - a game is over when all fields are taken
    - there are two players in the game (X and O)
    - a game has nine fields in a 3x3 grid
    - a game is over when all fields in a column are taken by a player
    - a player can take a field if not already taken
 * 
 * 
 * 
 * Proposed design:
 *
 * A ticTacToe function accepts the position (x, y) of the next move
 * Player X starts
 * The function returns either a string with the winner player
 *    e.g. Player X won ✨
 * or a string with who's next turn
 *    e.g. Player O your move ⏳
 * 
 */

describe("Tic Tac Toe", () => {
  it("returns the ", () => {
    expect(ticTacToe(0, 0)).toEqual("Player O your move ⏳");
  });
});
