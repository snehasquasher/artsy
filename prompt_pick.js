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
  return {
    prompt: prompt.innerHTML,
    promptElement: prompt
  }
}

function updateCursorPosition(leftHand, rightHand, neck) {

  let left_hand = leftHand.y;
  let right_hand = rightHand.y;
  //console.log('right_hand: ', right_hand)
  let neckHeight = neck.y;
  //console.log('neckHeight: ', neckHeight)

  const progressBar = document.getElementById('progress-bar-fill');
  if (right_hand >= neckHeight && left_hand >= neckHeight) { // If the both hands down, reset the timer
    //console.log('both hands are down')
    timer = LEFT_SELECTION_TIMEOUT; // Reset timer
    lastCursorUpdateTime = Date.now();
    // if (progressBar.classList.contains('animate')) {
    //     progressBar.classList.remove('animate');
    // }
    return;
  }

  if (right_hand < neckHeight && left_hand < neckHeight) { // If the both hands up, reset the timer
    //console.log('both hands are up')
    timer = LEFT_SELECTION_TIMEOUT; // Reset timer
    lastCursorUpdateTime = Date.now();
    // if (progressBar.classList.contains('animate')) {
    //     progressBar.classList.remove('animate');
    // }
    return;
  }

  if (right_hand < neckHeight) { // right hand up -> move to free draw
    //console.log('right hand up');
    // if (!progressBar.classList.contains('animate')) {
    //   progressBar.classList.add('animate');
    // } 
    var timeElapsed = Date.now() - lastCursorUpdateTime;

    if (timeElapsed > timer) {
      localStorage.setItem('prompt', document.getElementById('prompt').innerHTML);
      window.location.href = 'start_draw.html'; // add prompt as well 
      timer = RIGHT_SELECTION_TIMEOUT;
    } else {
      timer -= timeElapsed;
    }
  }

  if (left_hand < neckHeight) { // right hand up -> move to free draw
    var timeElapsed = Date.now() - lastCursorUpdateTime;

    if (timeElapsed > timer) {
      choosePrompt()
      window.location.href = 'prompt_pick.html';
      timer = LEFT_SELECTION_TIMEOUT;
    } else {
      timer -= timeElapsed;
    }
  }
  lastCursorUpdateTime = Date.now();
}

$(document).ready(function () {
  lastCursorUpdateTime = Date.now();
  timer = RIGHT_SELECTION_TIMEOUT;
  startCursorTracking(updateCursorPosition);
  choosePrompt();
});

function devRechoose() {
  choosePrompt();
}

function devNext() {
    localStorage.setItem('prompt', document.getElementById('prompt').innerHTML);
    window.location.href = 'start_draw.html'; // add prompt as well 
    timer = RIGHT_SELECTION_TIMEOUT;
}

// $(document).ready(function () {
//   const generate = document.getElementById('generate');
//   const proceed = document.getElementById('proceed');
//   if(proceed) {
//     proceed.addEventListener('click', () => {
//       localStorage.setItem('prompt', document.getElementById('prompt').innerHTML);
//       window.location.href = 'start_draw.html';
//       // Set the prompt in the next screen
//     });
//   }
//   if(generate) {
//     generate.addEventListener('click', () => {
//       choosePrompt();
//     });
//   }

//   choosePrompt();
//   startCursorTracking(checkRaisedHands);
// });
