const SELECTION_TIMEOUT = 5000;

let lastCursorUpdateTime;
let timer;
let progressBarValue = 0;

const nextScreenBtn = document.getElementById('tutorial-screen-btn');

const progressBar = document.querySelector('.progress-bar-fill');

function updateCursorPosition(leftHand, rightHand, neck) {
  const left_hand = leftHand.y;
  const right_hand = rightHand.y;
  const neckHeight = neck.y;

  if (right_hand >= neckHeight && left_hand >= neckHeight) {
    // Both hands down -> reset timer and progress bar
    timer = SELECTION_TIMEOUT;
    lastCursorUpdateTime = Date.now();
    progressBarValue = 0;
    progressBar.style.width = '0%';
    return;
  }

  const timeElapsed = Date.now() - lastCursorUpdateTime;

  if (right_hand < neckHeight) {
    // Right hand up -> move to free draw
    progressBarValue += (SELECTION_TIMEOUT - timeElapsed) / SELECTION_TIMEOUT;
    progressBar.style.width = `${progressBarValue * 100}%`;
    if (progressBarValue >= 1) {
      window.location.href = 'start_draw.html';
      timer = SELECTION_TIMEOUT;
    } else {
      timer -= timeElapsed;
    }
  } else if (left_hand < neckHeight) {
    // Left hand up -> move to random prompt
    progressBarValue += (SELECTION_TIMEOUT - timeElapsed) / SELECTION_TIMEOUT;
    progressBar.style.width = `${progressBarValue * 100}%`;
    if (progressBarValue >= 1) {
      window.location.href = 'prompt_pick.html';
      timer = SELECTION_TIMEOUT;
    } else {
      timer -= timeElapsed;
    }
  } else {
    // Both hands up -> reset timer and progress bar
    progressBarValue = 0;
    progressBar.style.width = '0%';
    timer = SELECTION_TIMEOUT;
  }

  lastCursorUpdateTime = Date.now();
}

$(document).ready(function () {
  lastCursorUpdateTime = Date.now();
  timer = SELECTION_TIMEOUT;
  startCursorTracking(updateCursorPosition);
});