const canvas = document.getElementById("ludoBoard");
const ctx = canvas.getContext("2d");
const rollBtn = document.getElementById("rollBtn");
const statusText = document.getElementById("status");
const diceValue = document.getElementById("diceValue");

// Players
let players = [
  { name: "Player 1", color: "red", position: 0 },
  { name: "Player 2", color: "blue", position: 0 }
];

let currentPlayer = 0;
let path = [];
let cellSize = 40;
let diceRoll = 0;

// Create simple Ludo-like path (just a straight 50 cells for demo)
for (let i = 0; i < 50; i++) {
  path.push({ x: (i % 10) * cellSize + 50, y: Math.floor(i / 10) * cellSize + 50 });
}

// Draw board grid
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  
  // Grid cells
  for (let i = 0; i < path.length; i++) {
    ctx.strokeRect(path[i].x, path[i].y, cellSize, cellSize);
  }
  
  // Draw players
  for (let p = 0; p < players.length; p++) {
    if (players[p].position < path.length) {
      let pos = path[players[p].position];
      ctx.beginPath();
      ctx.arc(pos.x + cellSize/2, pos.y + cellSize/2, 15, 0, Math.PI*2);
      ctx.fillStyle = players[p].color;
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Roll dice
function rollDice() {
  diceRoll = Math.floor(Math.random() * 6) + 1;
  diceValue.textContent = `Dice Rolled: ${diceRoll}`;
  
  let player = players[currentPlayer];
  player.position += diceRoll;
  
  if (player.position >= path.length - 1) {
    statusText.textContent = `${player.name} (${player.color}) Wins! 🎉`;
    rollBtn.disabled = true;
  } else {
    currentPlayer = (currentPlayer + 1) % players.length;
    statusText.textContent = `${players[currentPlayer].name} (${players[currentPlayer].color}) Turn`;
  }
  drawBoard();
}

rollBtn.addEventListener("click", rollDice);

drawBoard();
