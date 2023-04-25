const LEFT_CONFIRM_TIMEOUT = 5000;
const RIGHT_EXIT_TIMEOUT = 5000;

var lastLeftHandUpdateTime;
var lastRightHandUpdateTime;

var leftTimer;
var rightTimer;

function updateCursorPosition(leftHand, rightHand, neck) {
  let left_hand = leftHand.y;
  let right_hand = rightHand.y;
  let neckHeight = neck.y;

  const progressBar = document.getElementById('progress-bar-fill');

  if (left_hand >= neckHeight && right_hand >= neckHeight) { // If both hands are down, reset timer
    timer = LEFT_CONFIRM_TIMEOUT;
    lastCursorUpdateTime = Date.now();
    return;
  }

  if (left_hand < neckHeight) { // Left hand up -> confirm
    var timeElapsed = Date.now() - lastCursorUpdateTime;

    if (timeElapsed > timer) {
      window.location.href = 'barcode2.html';
      timer = LEFT_CONFIRM_TIMEOUT;
    } else {
      timer -= timeElapsed;
    }
  }

  if (right_hand < neckHeight) { // Right hand up -> exit
    var timeElapsed = Date.now() - lastCursorUpdateTime;

    if (timeElapsed > timer) {
      window.location.href = 'index.html';
      timer = RIGHT_EXIT_TIMEOUT;
    } else {
      timer -= timeElapsed;
    }
  }

  lastCursorUpdateTime = Date.now();
}

$(document).ready(function () {
  lastCursorUpdateTime = Date.now();
  timer = LEFT_CONFIRM_TIMEOUT;
  startCursorTracking(updateCursorPosition);
});

function devConfirm() {
  window.location.href = 'barcode2.html';
}

function devExit() {
  window.location.href = 'index.html';
}