// 1. Setup our image data
const BLANK_IMAGE = "https://placehold.co/120x120/2c3e50/ffffff?text=?";

// We need 6 pairs to fill a 12-tile grid
const actualImagesSource = [
    "https://placehold.co/120x120/e74c3c/ffffff?text=Apple",
    "https://placehold.co/120x120/f1c40f/ffffff?text=Banana",
    "https://placehold.co/120x120/2ecc71/ffffff?text=Grape",
    "https://placehold.co/120x120/3498db/ffffff?text=Berry",
    "https://placehold.co/120x120/9b59b6/ffffff?text=Plum",
    "https://placehold.co/120x120/e67e22/ffffff?text=Orange"
];

// 2. Create the two arrays of size 12
let blankImages = [];
let actualImages = [];

// Populate the actualImages array with pairs
// We use a loop to push each image twice
for (let i = 0; i < actualImagesSource.length; i++) {
    actualImages.push(actualImagesSource[i]);
    actualImages.push(actualImagesSource[i]);
}

// Shuffle the actualImages array using Math.random()
// This ensures the layout is different every time you refresh
actualImages.sort(() => Math.random() - 0.5);

// Fill the blankImages array with the placeholder URL
for (let i = 0; i < 12; i++) {
    blankImages.push(BLANK_IMAGE);
}

// 3. Display the images in the grid
const gameBoard = document.getElementById("game-board");

for (let i = 0; i < 12; i++) {
    // Create an <img> element
    let tile = document.createElement("img");
    
    // Set initial attributes
    tile.src = blankImages[i];
    tile.classList.add("tile");
    tile.dataset.index = i; // Store the index so we know which hidden image to show

    // 4. Add Click Event
    tile.addEventListener("click", function() {
        let index = this.dataset.index;
        // Reveal the actual image from our randomized array
        this.src = actualImages[index];
        
        console.log("Tile " + index + " revealed!");
    });

    // Add to the HTML grid
    gameBoard.appendChild(tile);
}