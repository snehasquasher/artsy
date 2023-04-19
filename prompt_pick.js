const LEFT_SELECTION_TIMEOUT = 5000;
const RIGHT_SELECTION_TIMEOUT = 5000;

var lastLeftHandUpdateTime;
var lastRightHandUpdateTime;

var leftTimer;
var rightTimer;


const prompts = [
  "Cat",
  "Tree",
  "Car",
  "House",
  "Sun",
  "Clock",
  "Apple",
  "Dog",
  "Ball",
  "Book",
  "Flower",
  "Chair",
  "Fish",
  "Bird",
  "Cake",
  "Bridge",
  "Rainbow",
  "Star",
  "Bicycle",
  "Moon"
];

function choosePrompt() {
  const prompt = document.getElementById('prompt');
  prompt.innerHTML = prompts[Math.floor(Math.random() * prompts.length)];
  return prompt;
}

function checkLeftHand(_, leftY) {

  if (leftY < window.innerHeight / 2) { // If the cursor is in the bottom half of the screen, reset the timer
    leftTimer = LEFT_SELECTION_TIMEOUT; // Reset left timer
    lastLeftHandUpdateTime = Date.now();
    // if (progressBar.classList.contains('animate')) {
    //   progressBar.classList.remove('animate');
    // }
    return;
  }

  var leftTimeElapsed = Date.now() - lastLeftHandUpdateTime;

  if (leftTimeElapsed > leftTimer) {
    choosePrompt();
    leftTimer = LEFT_SELECTION_TIMEOUT;
  } else {
    leftTimer -= leftTimeElapsed;
  }
  lastLeftHandUpdateTime = Date.now();
}

function checkRightHand(_, rightY) {
  if (rightY < window.innerHeight / 2) { // If the cursor is in the bottom half of the screen, reset the timer
    rightTimer = RIGHT_SELECTION_TIMEOUT; // Reset left timer
    lastRightHandUpdateTime = Date.now();
    // if (progressBar.classList.contains('animate')) {
    //   progressBar.classList.remove('animate');
    // }
    return;
  }

  var rightTimeElapsed = Date.now() - lastRightHandUpdateTime;

  if (rightTimeElapsed > rightTimer) {
    // choosePrompt();
    rightTimer = RIGHT_SELECTION_TIMEOUT;
  } else {
    rightTimer -= rightTimeElapsed;
  }
  lastRightHandUpdateTime = Date.now();
}

function checkRaisedHands(leftHand, rightHand) {
  checkLeftHand(leftHand.x, leftHand.y);
  checkRightHand(rightHand.x, rightHand.y);
}

$(document).ready(function () {
  const generate = document.getElementById('generate');
  const proceed = document.getElementById('proceed');
  if(proceed) {
    proceed.addEventListener('click', () => {
      localStorage.setItem('prompt', document.getElementById('prompt').innerHTML);
      window.location.href = 'start_draw.html';
      // Set the prompt in the next screen
    });
  }
  if(generate) {
    generate.addEventListener('click', () => {
      choosePrompt();
    });
  }

  choosePrompt();
  startCursorTracking(checkRaisedHands);
});
