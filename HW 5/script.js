let stage = "wake";
let stepstaken = 0;
let arrivalStatus = "";

function IncrementSteps() {
    stepstaken++;
    return stepstaken;
}

function HandleChoice() {
    const input = document.getElementById("userInput").value.toLowerCase().trim();
    document.getElementById("userInput").value = "";

    IncrementSteps();

    switch (stage) {

        case "wake":
            if (input === "phone") {
                stage = "phone";
                updateStory(
                    "You get caught up in social media and now you're late.<br><br>" +
                    "Do you <strong>skip shower</strong> or <strong>skip breakfast</strong>?",
                    "images/ScrollingPhone.jpg",
                    "#f8d7da"
                );
            } else if (input === "shower") {
                stage = "shower";
                updateStory(
                    "You decide to be responsible and take a shower.<br><br>" +
                    "Do you eat a <strong>quick</strong> breakfast or a <strong>healthy</strong> breakfast?",
                    "images/ShowerTime.jpg",
                    "#d4edda"
                );
            } else {
                invalidChoice();
            }
            break;

        case "phone":
            if (input === "skip shower") {
                stage = "skipShower";
                updateStory(
                    "You skip the shower.<br><br>" +
                    "Do you look for <strong>deodorant</strong> or accept being <strong>stinky</strong>?",
                    "images/NoShower.jpg",
                    "#fff3cd"
                );
            } else if (input === "skip breakfast") {
                stage = "skipBreakfast";
                updateStory(
                    "You skip breakfast.<br><br>" +
                    "Do you go through the <strong>drive-thru</strong> or stay <strong>hungry</strong>?",
                    "images/NoBreakfast.png",
                    "#fff3cd"
                );
            } else {
                invalidChoice();
            }
            break;

        case "skipShower":
            if (input === "deodorant") {
                arrivalStatus = "late";
                stage = "arrival";
                updateStory(
                    "While searching for deodorant, you rear-end the car in front of you.<br><br>" +
                    "You still make it to work eventually. How do you feel when you arrive?<br>" +
                    "<strong>embarrassed</strong> or <strong>frustrated</strong>?",
                    "images/Accident.jpg",
                    "#f5c6cb"
                );
            } else if (input === "stinky") {
                arrivalStatus = "stinky";
                stage = "arrival";
                updateStory(
                    "You arrive on time… but very stinky.<br><br>" +
                    "How do you react?<br><strong>ignore</strong> it or feel <strong>self-conscious</strong>?",
                    "images/StinkyCar.jpg",
                    "#fff3cd"
                );
            } else {
                invalidChoice();
            }
            break;

        case "skipBreakfast":
            if (input === "drive-thru") {
                arrivalStatus = "late";
                stage = "arrival";
                updateStory(
                    "The drive-thru line is slow and you arrive late to work.<br><br>" +
                    "How do you respond when a coworker notices?<br>" +
                    "<strong>joke</strong> about it or feel <strong>awkward</strong>?",
                    "images/DriveThru.jpg",
                    "#f8d7da"
                );
            } else if (input === "hungry") {
                arrivalStatus = "hungry";
                stage = "arrival";
                updateStory(
                    "You arrive on time but you're starving.<br><br>" +
                    "Do you grab <strong>coffee</strong> or just push through feeling <strong>miserable</strong>?",
                    "images/HungryWork.jpg",
                    "#d4edda"
                );
            } else {
                invalidChoice();
            }
            break;

        case "shower":
            if (input === "quick") {
                arrivalStatus = "hungry";
                stage = "arrival";
                updateStory(
                    "You arrive on time but feel a little hungry.<br><br>" +
                    "Do you get <strong>coffee</strong> or wait until <strong>lunch</strong>?",
                    "images/HungryWork.jpg",
                    "#d4edda"
                );
            } else if (input === "healthy") {
                arrivalStatus = "great";
                stage = "arrival";
                updateStory(
                    "You arrive on time feeling great and energized.<br><br>" +
                    "Do you start working <strong>immediately</strong> or chat with <strong>coworkers</strong>?",
                    "images/HappyWork.jpg",
                    "#c3e6cb"
                );
            } else {
                invalidChoice();
            }
            break;

        case "arrival":
            stage = "workOutcome";

            if (arrivalStatus === "stinky") {
                updateStory(
                    "Your boss pulls you aside and comments on your hygiene.<br><br>" +
                    "Do you feel <strong>embarrassed</strong> or <strong>defensive</strong>?",
                    "images/BossTalk.jpg",
                    "#f5c6cb"
                );
            } else if (arrivalStatus === "late") {
                updateStory(
                    "A coworker jokes about how often you get drive-thru breakfast.<br><br>" +
                    "Do you <strong>laugh</strong> it off or feel <strong>annoyed</strong>?",
                    "images/CoworkerTalk.jpg",
                    "#fff3cd"
                );
            } else if (arrivalStatus === "hungry") {
                updateStory(
                    "You struggle to focus because you're hungry.<br><br>" +
                    "Do you <strong>snack</strong> secretly or <strong>push through</strong>?",
                    "images/OfficeDesk.jpg",
                    "#d4edda"
                );
            } else {
                updateStory(
                    "Your boss compliments your positive attitude.<br><br>" +
                    "Do you feel <strong>proud</strong> or <strong>motivated</strong>?",
                    "images/Success.jpg",
                    "#c3e6cb"
                );
            }
            break;

        case "workOutcome":
            endStory(
                "The workday ends and you head home reflecting on your choices.",
                "images/GoingHome.jpg",
                "#cccccc"
            );
            break;
    }
}

function updateStory(text, image, bgColor) {
    document.getElementById("story").innerHTML = text;
    document.getElementById("storyImage").src = image;
    document.body.style.backgroundColor = bgColor;
}

function endStory(text, image, bgColor) {
    updateStory(
        `${text}<br><br>You made ${stepstaken} decisions today.`,
        image,
        bgColor
    );
    document.getElementById("restart").style.display = "block";
}

function restartStory() {
    stage = "wake";
    stepstaken = 0;
    arrivalStatus = "";
    document.getElementById("restart").style.display = "none";
    updateStory(
        "Congratulations, it's yet another Monday morning, and your alarm is going off once again.<br><br>" +
        "Do you <strong>get up to shower (shower)</strong> or <strong>doomscroll your phone (phone)</strong>?",
        "images/MessyBed.jpg",
        "white"
    );
}

function invalidChoice() {
    document.getElementById("story").innerHTML += "<br><br>Please enter a valid option shown above.";
}
