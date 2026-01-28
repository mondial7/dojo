import { createRoot } from "react-dom/client";
import { useState } from "react";

interface Game {
  id: string;
  board: string[];
  currentPlayer: "X" | "O";
  winner: "X" | "O" | "draw" | null;
}

function TicTacToe() {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(false);

  async function startNewGame() {
    setLoading(true);
    const response = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const newGame = await response.json();
    setGame(newGame);
    setLoading(false);
  }

  async function makeMove(position: number) {
    if (!game || game.winner || game.board[position]) return;

    setLoading(true);
    const response = await fetch(`/api/games/${game.id}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position }),
    });
    const updatedGame = await response.json();
    setGame(updatedGame);
    setLoading(false);
  }

  // Render the game board (3x3 grid of buttons)
  // TODO: Add styling to make it look better
  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Tic-Tac-Toe</h1>

      {!game ? (
        <div>
          <button onClick={startNewGame} disabled={loading}>
            Start New Game
          </button>
        </div>
      ) : (
        <div>
          <p>Current Player: {game.currentPlayer}</p>

          {game.winner && (
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              {game.winner === "draw"
                ? "It's a draw!"
                : `Winner: ${game.winner}`}
            </p>
          )}

          {/* 3x3 grid of buttons (intentionally ugly - no styling) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 80px)",
              gap: "5px",
              marginTop: "20px",
            }}
          >
            {game.board.map((cell, index) => (
              <button
                key={index}
                onClick={() => makeMove(index)}
                disabled={loading || !!game.winner || !!cell}
                style={{
                  width: "80px",
                  height: "80px",
                  fontSize: "24px",
                  cursor:
                    loading || game.winner || cell ? "not-allowed" : "pointer",
                }}
              >
                {cell}
              </button>
            ))}
          </div>

          <button
            onClick={startNewGame}
            disabled={loading}
            style={{ marginTop: "20px" }}
          >
            Start New Game
          </button>

          {/* TODO: Add game history display */}
          {/* TODO: Add undo move button */}
          {/* TODO: Add AI opponent option */}
        </div>
      )}
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<TicTacToe />);
}
