const SELECTION_TIMEOUT = 5000;

var lastCursorUpdateTime; 
var timer;

const nextScreenBtn = document.getElementById('tutorial-screen-btn');

function updateCursorPosition(leftHand, rightHand, neck) {

    let left_hand = leftHand.y;
    let right_hand = rightHand.y;
    console.log('right_hand: ', right_hand)
    let neckHeight = neck.y;
    console.log('neckHeight: ', neckHeight)

    const progressBar = document.getElementById('progress-bar-fill');
    if(right_hand >= neckHeight && left_hand >= neckHeight) { // If the both hands down, reset the timer
        console.log('both hands are down')
        timer = SELECTION_TIMEOUT; // Reset timer
        lastCursorUpdateTime = Date.now();
        // if (progressBar.classList.contains('animate')) {
        //     progressBar.classList.remove('animate');
        // }
        return;
    }

    if(right_hand < neckHeight && left_hand < neckHeight) { // If the both hands up, reset the timer
      console.log('both hands are up')
      timer = SELECTION_TIMEOUT; // Reset timer
      lastCursorUpdateTime = Date.now();
      // if (progressBar.classList.contains('animate')) {
      //     progressBar.classList.remove('animate');
      // }
      return;
  }

    if (right_hand < neckHeight) { // right hand up -> move to free draw
      console.log('right hand up');
      // if (!progressBar.classList.contains('animate')) {
      //   progressBar.classList.add('animate');
      // } 
      var timeElapsed = Date.now() - lastCursorUpdateTime;

      if(timeElapsed > timer) {
          window.location.href = 'start_draw.html';
          timer = SELECTION_TIMEOUT;
      } else {
          timer -= timeElapsed;
      }
    }

    if (left_hand < neckHeight) { // right hand up -> move to free draw
      console.log('left hand up');
      // if (!progressBar.classList.contains('animate')) {
      //   progressBar.classList.add('animate');
      // } 
      var timeElapsed = Date.now() - lastCursorUpdateTime;

      if(timeElapsed > timer) {
          window.location.href = 'prompt_pick.html';
          timer = SELECTION_TIMEOUT;
      } else {
          timer -= timeElapsed;
      }
    }


    // console.log('hand is up')
    // if (!progressBar.classList.contains('animate')) {
    //     progressBar.classList.add('animate');
    
    // }

    // var timeElapsed = Date.now() - lastCursorUpdateTime;

    // if(timeElapsed > timer) {
    //     window.location.href = 'prompt_pick.html';
    //     timer = SELECTION_TIMEOUT;
    // } else {
    //     timer -= timeElapsed;
    // }

    lastCursorUpdateTime = Date.now();
}

$(document).ready(function () {
  lastCursorUpdateTime = Date.now();
  timer = SELECTION_TIMEOUT;
  startCursorTracking(updateCursorPosition);
});


// nextScreenBtn.addEventListener('click', () => {
//   window.location.href = 's2_tutorial.html';
// });

