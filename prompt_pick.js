const LEFT_SELECTION_TIMEOUT = 5000;
const RIGHT_SELECTION_TIMEOUT = 5000;

var lastLeftHandUpdateTime;
var lastRightHandUpdateTime;

var leftTimer;
var rightTimer;

var color;


const prompts = [
  { emotion: 'Love', color: '#FFC0CB' },
  { emotion: 'Joy', color: '#FFFF00' },
  { emotion: 'Excitement', color: '#FF4500' },
  { emotion: 'Anger', color: '#FF0000' },
  { emotion: 'Sadness', color: '#6495ED' },
  { emotion: 'Fear', color: '#8B0000' },
  { emotion: 'Disgust', color: '#008000' },
  { emotion: 'Surprise', color: '#FF69B4' },
  { emotion: 'Envy', color: '#008080' },
  { emotion: 'Calmness', color: '#00CED1' }
];

function choosePrompt() {
  var promptEl = document.getElementById('prompt');
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  promptEl.innerHTML = prompt.emotion;
  color = prompt.color;
  localStorage.setItem('prompt', prompt.emotion);
  localStorage.setItem('strokeColor', color);
  return {
    prompt,
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
      localStorage.setItem('strokeColor', color);
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
    localStorage.setItem('strokeColor', color);
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
