// Tic-Tac-Toe Backend - Entire API in one file for easy reading

// ==================== TYPES ====================
interface Game {
  id: string;
  board: string[]; // 9 elements: 'X', 'O', or ''
  currentPlayer: "X" | "O";
  winner: "X" | "O" | "draw" | null;
}

// ==================== GAME LOGIC ====================
// Check all 8 possible winning combinations
export function checkWinner(board: string[]): "X" | "O" | "draw" | null {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  // Check each winning combination
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as "X" | "O";
    }
  }

  // Check for draw (board full, no winner)
  if (board.every((cell) => cell !== "")) {
    return "draw";
  }

  // Game still in progress
  return null;
}

// ==================== FILE STORAGE ====================
const GAMES_FILE = "data/games.txt";

// Read all games from file (JSON Lines format)
async function readGames(): Promise<Game[]> {
  try {
    const file = Bun.file(GAMES_FILE);
    const content = await file.text();
    if (!content || content.trim() === "") return [];

    return content
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line));
  } catch (error) {
    return []; // File doesn't exist yet
  }
}

// Write all games to file
async function writeGames(games: Game[]): Promise<void> {
  const content = games.map((game) => JSON.stringify(game)).join("\n") + "\n";
  await Bun.write(GAMES_FILE, content);
}

// Get a single game by ID
async function getGame(id: string): Promise<Game | null> {
  const games = await readGames();
  return games.find((g) => g.id === id) || null;
}

// Create a new game
async function createGame(): Promise<Game> {
  const game: Game = {
    id: `game-${Date.now()}`,
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    winner: null,
  };

  const games = await readGames();
  games.push(game);
  await writeGames(games);

  return game;
}

// Update an existing game
async function updateGame(updatedGame: Game): Promise<void> {
  const games = await readGames();
  const index = games.findIndex((g) => g.id === updatedGame.id);
  if (index !== -1) {
    games[index] = updatedGame;
    await writeGames(games);
  }
}

// TODO: Add DELETE endpoint to remove a game
// TODO: Add GET /api/games to list all games

// ==================== API SERVER ====================
// Only start server if this file is run directly (not imported by tests)
if (import.meta.main) {
  const server = Bun.serve({
    port: 3000,
    async fetch(req) {
      const url = new URL(req.url);

      // CREATE new game: POST /api/games
      if (url.pathname === "/api/games" && req.method === "POST") {
        const game = await createGame();
        return new Response(JSON.stringify(game), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // GET game by ID: GET /api/games/:id
      if (url.pathname.startsWith("/api/games/") && req.method === "GET") {
        const id = url.pathname.split("/")[3];
        const game = await getGame(id);

        if (!game) {
          return new Response("Game not found", { status: 404 });
        }

        return new Response(JSON.stringify(game), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // MAKE a move: POST /api/games/:id/move
      if (url.pathname.includes("/move") && req.method === "POST") {
        const id = url.pathname.split("/")[3];
        const game = await getGame(id);

        if (!game) {
          return new Response("Game not found", { status: 404 });
        }

        const body = (await req.json()) as { position: number };
        const position = body.position;

        // TODO: Add validation for invalid moves (position out of range, cell already taken)

        // Make the move
        game.board[position] = game.currentPlayer;
        game.winner = checkWinner(game.board);

        // Switch player if game not over
        if (!game.winner) {
          game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
        }

        await updateGame(game);

        return new Response(JSON.stringify(game), {
          headers: { "Content-Type": "application/json" },
        });
      }

      // Serve the React app (index.html)
      if (url.pathname === "/" || url.pathname === "/index.html") {
        return new Response(Bun.file("index.html"));
      }

      // Serve static files from dist/ (React bundle)
      if (url.pathname.startsWith("/dist/")) {
        return new Response(Bun.file(`.${url.pathname}`));
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(`Server running at http://localhost:${server.port}`);
}
