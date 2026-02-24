let blankArray = new Array(12).fill("images/blank.jpg");

let actualArray = [
    "images/chicken1.jpg",
    "images/frog2.jpg",
    "images/dog3.jpg",
    "images/cat4.jpg",
    "images/fish5.jpg",
    "images/bird6.jpg",
];

actualArray = actualArray.concat(actualArray);

actualArray.sort(() => Math.random() - 0.5);

let board = document.getElementById("gameboard");

for (let i = 0; i < actualArray.length; i++) {
    let tile = document.createElement("div");
    tile.className = "tile";
    let img = document.createElement("img");
    img.src = blankArray[i];
    tile.appendChild(img);
    tile.addEventListener("click", function () {
        img.src = actualArray[i];
    });
    board.appendChild(tile);
}