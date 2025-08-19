const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const rollBtn = document.getElementById("roll");
const diceResult = document.getElementById("dice-result");
const turnText = document.getElementById("turn");

const tileSize = 60;
let players = [
  { pos: 0, color: "red" },
  { pos: 0, color: "blue" }
];
let currentPlayer = 0;

const snakes = {
  16: 6, 48: 26, 64: 60, 79: 19,
  93: 68, 95: 24, 97: 76, 98: 78
};

const ladders = {
  1: 38, 4: 14, 9: 31, 21: 42,
  28: 84, 36: 44, 51: 67, 71: 91, 80: 100
};

// Draw players on board
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  players.forEach((player, i) => {
    if (player.pos > 0) {
      let coords = getCoordinates(player.pos);
      ctx.beginPath();
      ctx.arc(coords.x + tileSize / 2, coords.y + tileSize / 2, 20, 0, 2 * Math.PI);
      ctx.fillStyle = player.color;
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "16px bold Arial";
      ctx.fillText(i + 1, coords.x + tileSize / 2 - 5, coords.y + tileSize / 2 + 5);
    }
  });
}

function getCoordinates(pos) {
  let row = Math.floor((pos - 1) / 10);
  let col = (pos - 1) % 10;
  if (row % 2 === 1) col = 9 - col;
  let x = col * tileSize;
  let y = (9 - row) * tileSize;
  return { x, y };
}

rollBtn.addEventListener("click", () => {
  let dice = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `🎲 Dice: ${dice}`;
  let player = players[currentPlayer];

  player.pos += dice;
  if (player.pos > 100) player.pos = 100;

  if (snakes[player.pos]) player.pos = snakes[player.pos];
  if (ladders[player.pos]) player.pos = ladders[player.pos];

  if (player.pos === 100) {
    setTimeout(() => {
      alert(`🎉 Player ${currentPlayer + 1} wins!`);
      resetGame();
    }, 200);
    return;
  }

  currentPlayer = (currentPlayer + 1) % players.length;
  turnText.textContent = `Player ${currentPlayer + 1}'s Turn`;
  drawBoard();
});

function resetGame() {
  players.forEach(p => p.pos = 0);
  currentPlayer = 0;
  diceResult.textContent = "🎲 Dice: -";
  turnText.textContent = "Player 1's Turn";
  drawBoard();
}

drawBoard();
