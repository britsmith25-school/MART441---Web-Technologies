const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let obstacles = [];
let collectibles = [];
let score = 0;

class Obstacle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Collectible {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.active = true;
  }

  draw() {
    if (!this.active) return;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

class Player {
  constructor() {
    this.x = 20;
    this.y = 20;
    this.size = 20;
    this.speed = 3;
  }

  draw() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move(dx, dy) {
    let newX = this.x + dx;
    let newY = this.y + dy;

    if (
      newX < 0 ||
      newY < 0 ||
      newX + this.size > canvas.width ||
      newY + this.size > canvas.height
    ) {
      return;
    }

    for (let obs of obstacles) {
      if (
        newX < obs.x + obs.width &&
        newX + this.size > obs.x &&
        newY < obs.y + obs.height &&
        newY + this.size > obs.y
      ) {
        return; 
      }
    }

    this.x = newX;
    this.y = newY;
  }
}

const player = new Player();

async function loadData() {
  const obsData = await fetch("obstacles.json").then(res => res.json());
  obstacles = obsData.map(o => new Obstacle(o.x, o.y, o.width, o.height, o.color));

  const colData = await fetch("collectibles.json").then(res => res.json());
  collectibles = colData.map(c => new Collectible(c.x, c.y, c.size, c.color));
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.move(0, -player.speed);
  if (e.key === "ArrowDown") player.move(0, player.speed);
  if (e.key === "ArrowLeft") player.move(-player.speed, 0);
  if (e.key === "ArrowRight") player.move(player.speed, 0);
});

function checkCollectibles() {
  for (let c of collectibles) {
    if (!c.active) continue;

    if (
      player.x < c.x + c.size &&
      player.x + player.size > c.x &&
      player.y < c.y + c.size &&
      player.y + player.size > c.y
    ) {
      c.active = false;
      score++;
      document.getElementById("score").textContent = score;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();

  obstacles.forEach(o => o.draw());
  collectibles.forEach(c => c.draw());

  checkCollectibles();

  requestAnimationFrame(gameLoop);
}

loadData().then(() => {
  gameLoop();
});