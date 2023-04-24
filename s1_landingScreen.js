const SELECTION_TIMEOUT = 5000;

var lastCursorUpdateTime; 
var timer;

const nextScreenBtn = document.getElementById('tutorial-screen-btn');

function updateCursorPosition(_, rightHand, neck) {

    let y = rightHand.y;
    console.log('y: ', y)
    let neckHeight = neck.y;
    console.log('neckHeight: ', neckHeight)

    const progressBar = document.getElementById('progress-bar-fill');
    if(y >= neckHeight) { // If the cursor is in the bottom half of the screen, reset the timer
        console.log('hand is down')
        timer = SELECTION_TIMEOUT; // Reset timer
        lastCursorUpdateTime = Date.now();
        if (progressBar.classList.contains('animate')) {
            progressBar.classList.remove('animate');
        }
        return;
    }
    console.log('hand is up')
    if (!progressBar.classList.contains('animate')) {
        progressBar.classList.add('animate');
    }

    var timeElapsed = Date.now() - lastCursorUpdateTime;

    if(timeElapsed > timer) {
        window.location.href = 'prompt_pick.html';
        timer = SELECTION_TIMEOUT;
    } else {
        timer -= timeElapsed;
    }

    lastCursorUpdateTime = Date.now();
}

$(document).ready(function () {
  lastCursorUpdateTime = Date.now();
  timer = SELECTION_TIMEOUT;
//   startCursorTracking(updateCursorPosition);
});



