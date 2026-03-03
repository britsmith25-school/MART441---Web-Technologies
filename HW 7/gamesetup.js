document.getElementById("startGame").addEventListener("click", function() {
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let age = document.getElementById("age").value.trim();

    if (firstName === "" || lastName === "" || age === "") {
        alert("Please fill in all fields.");
        return;
    }
    if (isNaN(age)) {
        alert("Age must be a number.");
        return;
    }

    let player = {
        firstName: firstName,
        lastName: lastName,
        age: Number(age),
        attempts: 0,
    };

    localStorage.setItem("playerData", JSON.stringify(player));
    window.location.href = "game.html";
});


