const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 40;
const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,2,2,1],
  [1,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1],
  [1,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let pacman = { row: 1, col: 1, size: 15 };

// Desenha mapa
function drawMap() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === 1) {
        ctx.fillStyle = "#00BFFF";
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      } else if (map[row][col] === 2) {
        ctx.beginPath();
        ctx.arc(col * cellSize + cellSize/2, row * cellSize + cellSize/2, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  }
}

// Desenha Pac-Man
function drawPacman() {
  const x = pacman.col * cellSize + cellSize/2;
  const y = pacman.row * cellSize + cellSize/2;
  ctx.beginPath();
  ctx.arc(x, y, pacman.size, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(x, y);
  ctx.fillStyle = "#FFD700";
  ctx.fill();
  ctx.closePath();
}

// Atualiza jogo
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPacman();
  requestAnimationFrame(update);
}

// Movimento Pac-Man
document.addEventListener("keydown", (e) => {
  let newRow = pacman.row;
  let newCol = pacman.col;

  if (e.key === "ArrowUp") newRow--;
  if (e.key === "ArrowDown") newRow++;
  if (e.key === "ArrowLeft") newCol--;
  if (e.key === "ArrowRight") newCol++;

  if (map[newRow][newCol] !== 1) {
    pacman.row = newRow;
    pacman.col = newCol;
  }
});

update();
