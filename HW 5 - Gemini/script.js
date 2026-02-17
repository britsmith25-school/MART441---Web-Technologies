// Global State
let currentStep = "start";

// 1. Function that takes parameters (Requirement)
function updateScene(text, color, imgUrl) {
    const storyDiv = document.getElementById("story-text");
    const container = document.getElementById("game-container");
    const imgElement = document.getElementById("story-image");

    storyDiv.innerHTML = text;
    container.style.borderColor = color; // Updating style from JS
    imgElement.src = imgUrl; // Updating image from JS
}

// 2. Function that returns a value (Requirement)
function formatInput(rawText) {
    return rawText.trim().toLowerCase();
}

// 3. A function using a loop (Requirement)
function logAction(action) {
    let i = 0;
    while (i < 3) {
        console.log("System Processing " + action + "...");
        i++;
    }
}

function processInput() {
    const inputField = document.getElementById("user-input");
    const choice = formatInput(inputField.value);
    logAction(choice);

    // 4. If/Else or Switch logic with 5+ options (Requirement)
    switch(currentStep) {
        case "start":
            if (choice === "north") {
                updateScene("You head North and find a High-Tech Lab. Do you [Hack] the door or [Knock]?", "#00ffff", "https://picsum.photos/id/133/600/300");
                currentStep = "lab";
            } else if (choice === "south") {
                updateScene("You head South to the Underground Market. Do you [Sell] the package or [Hide]?", "#ffff00", "https://picsum.photos/id/142/600/300");
                currentStep = "market";
            } else {
                alert("Please type North or South!");
            }
            break;

        case "lab":
            if (choice === "hack") {
                updateScene("Success! You're inside. You find a [Terminal]. Connect?", "#33ff33", "https://picsum.photos/id/160/600/300");
                currentStep = "terminal";
            } else {
                updateScene("The guards caught you. GAME OVER. [Restart]?", "#ff0000", "https://picsum.photos/id/237/600/300");
                showRestart();
            }
            break;

        case "market":
            if (choice === "sell") {
                updateScene("You're rich! But the mob is after you. Do you [Run] or [Fight]?", "#ff8800", "https://picsum.photos/id/111/600/300");
                currentStep = "mob";
            } else {
                updateScene("You hid so well nobody ever found you. You are safe but bored. [Restart]?", "#888888", "https://picsum.photos/id/119/600/300");
                showRestart();
            }
            break;

        case "terminal":
            updateScene("You uploaded the data and saved the city! THE END.", "#ffffff", "https://picsum.photos/id/102/600/300");
            showRestart();
            break;

        case "mob":
            updateScene("You escaped to the wasteland. To be continued... [Restart]?", "#000000", "https://picsum.photos/id/124/600/300");
            showRestart();
            break;
    }

    inputField.value = ""; // Clear input
}

function showRestart() {
    document.getElementById("input-area").style.display = "none";
    document.getElementById("restart-btn").style.display = "inline-block";
}

function restartGame() {
    currentStep = "start";
    document.getElementById("input-area").style.display = "block";
    document.getElementById("restart-btn").style.display = "none";
    updateScene("You wake up in a rain-slicked alleyway. <strong>'Where to, Courier? [North] or [South]?'</strong>", "#ff00ff", "https://picsum.photos/id/122/600/300");
}