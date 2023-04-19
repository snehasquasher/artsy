const SELECTION_TIMEOUT = 5000;

var lastCursorUpdateTime; 
var timer;

const nextScreenBtn = document.getElementById('tutorial-screen-btn');

function updateCursorPosition(_, rightHand) {

    let y = rightHand.y;

    const progressBar = document.getElementById('progress-bar-fill');
    if(y < window.innerHeight / 2) { // If the cursor is in the bottom half of the screen, reset the timer
        timer = SELECTION_TIMEOUT; // Reset timer
        lastCursorUpdateTime = Date.now();
        if (progressBar.classList.contains('animate')) {
            progressBar.classList.remove('animate');
        }
        return;
    }

    if (!progressBar.classList.contains('animate')) {
        progressBar.classList.add('animate');
    }

    var timeElapsed = Date.now() - lastCursorUpdateTime;

    if(timeElapsed > timer) {
        window.location.href = 's2_tutorial.html';
        timer = SELECTION_TIMEOUT;
    } else {
        timer -= timeElapsed;
    }

    lastCursorUpdateTime = Date.now();
}

$(document).ready(function () {
  lastCursorUpdateTime = Date.now();
  timer = SELECTION_TIMEOUT;
  startCursorTracking(updateCursorPosition);
});


nextScreenBtn.addEventListener('click', () => {
  window.location.href = 's2_tutorial.html';
});

