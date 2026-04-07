const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playButton = document.getElementById("playButton");
const bgMusic = document.getElementById("bgMusic");

playButton.addEventListener("click", function () {
    bgMusic.play();
});

let backgroundColor = "#222";
let flashTimer = 0;

let keys = {};

document.addEventListener("keydown", function (event) {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function (event) {
    keys[event.key.toLowerCase()] = false;
});

class GameObject {
    constructor(x, y, width, height, color, speedX = 0, speedY = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.originalWidth = width;
        this.originalHeight = height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    stayInBounds() {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }

    grow() {
        this.width = this.originalWidth + 15;
        this.height = this.originalHeight + 15;
    }

    resetSize() {
        this.width = this.originalWidth;
        this.height = this.originalHeight;
    }
}

const player = new GameObject(100, 250, 80, 80, "hotpink");
const movingBox = new GameObject(400, 300, 60, 60, "cyan", 4, 3);

function hasCollided(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

function movePlayer() {
    let speed = 5;

    if (keys["w"]) {
        player.y -= speed;
    }
    if (keys["s"]) {
        player.y += speed;
    }
    if (keys["a"]) {
        player.x -= speed;
    }
    if (keys["d"]) {
        player.x += speed;
    }

    player.stayInBounds();
}

function moveBox() {
    movingBox.move();

    if (movingBox.x <= 0 || movingBox.x + movingBox.width >= canvas.width) {
        movingBox.speedX *= -1;
    }

    if (movingBox.y <= 0 || movingBox.y + movingBox.height >= canvas.height) {
        movingBox.speedY *= -1;
    }

    movingBox.stayInBounds();
}

function handleCollision() {
    if (hasCollided(player, movingBox)) {
        backgroundColor = "purple";
        flashTimer = 10;
        player.grow();
        movingBox.grow();
    } else {
        player.resetSize();
        movingBox.resetSize();
    }
}

function drawBackground() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (flashTimer > 0) {
        flashTimer--;
    } else {
        backgroundColor = "#222";
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    movePlayer();
    moveBox();
    handleCollision();

    player.draw();
    movingBox.draw();

    if (hasCollided(player, movingBox)) {
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("TOUCH!", 350, 80);
    }

    requestAnimationFrame(updateGame);
}

updateGame();