let player = JSON.parse(localStorage.getItem("playerData"));

if (!player) {
    window.location.href = "index.html";
}

let attempts = 0;
let firstTile = null;
let secondTile = null;
let lockBoard = false;
let matches = 0;

let images = [
    "images/chicken1.jpg",
    "images/frog2.jpg",
    "images/dog3.jpg",
    "images/cat4.jpg",
    "images/fish5.jpg",
    "images/bird6.jpg"
];

let gameArray = images.concat(images);
gameArray.sort(() => Math.random() - 0.5);

let board = document.getElementById("gameboard");

for (let i = 0; i < gameArray.length; i++) {
    let tile = document.createElement("div");
    tile.className = "tile";

    let img = document.createElement("img");
    img.src = "images/blank.jpg";

    tile.appendChild(img);

    tile.addEventListener("click", function () {
        if (lockBoard || img.src.includes(gameArray[i])) return;

        img.src = gameArray[i];

        if (!firstTile) {
            firstTile = { tile, img, value: gameArray[i] };
        } else {
            secondTile = { tile, img, value: gameArray[i] };
            attempts++;
            document.getElementById("attemptDisplay").textContent = "Attempts: " + attempts;

            if (firstTile.value === secondTile.value) {
                matches++;
                resetTurn();
                checkGameOver();
            } else {
                lockBoard = true;
                setTimeout(() => {
                    firstTile.img.src = "images/blank.jpg";
                    secondTile.img.src = "images/blank.jpg";
                    resetTurn();
                }, 1000);
            }
        }
    });

    board.appendChild(tile);
}

function resetTurn() {
    firstTile = null;
    secondTile = null;
    lockBoard = false;
}

function checkGameOver() {
    if (matches === images.length) {
        player.attempts = attempts;
        localStorage.setItem("playerData", JSON.stringify(player));
        window.location.href = "results.html";
    }
}