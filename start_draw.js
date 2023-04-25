var canvas;
var ctx;
var isDrawing = false;
var cursorElement;
var prompt;
var promptElement;
var complete = false; 
const SELECTION_TIMEOUT = 2000;
var lastCursorUpdateTime;

function isElementOverlapping(x, y) {
    var rect = canvas.getBoundingClientRect()
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

function submit() {
    if (!canvas) {
        return
    }
    var image = new Image()
    image.src = canvas.toDataURL('image/jpg');
    const blob = dataURItoBlob(image.src);

    const date = new Date();
    const timestamp = date.getTime();

    storeImage(blob, prompt, timestamp).then(function (downloadUrl) {
        window.location.href = 'barcode2.html';
    })
}

function drawingCallback(_, rightHand,leftHand) {
    // Get the top corner of the canvas
    rightHand.x = window.innerWidth - rightHand.x;

    cursorElement.style.left = rightHand.x + 'px';
    cursorElement.style.top = rightHand.y + 'px';
    
    let rightHand_xaxis = rightHand.x; 
    let leftHand_xaxis = leftHand.x; 

    if (leftHand_xaxis < rightHand_xaxis){
        console.log('hand is crossed')
        timeElapsed = Date.now() - lastCursorUpdateTime;
        if(timeElapsed > timer) {
            window.location.href = 'index.html';
            timer = SELECTION_TIMEOUT;
        } else {
            timer -= timeElapsed;
        }
    
        lastCursorUpdateTime = Date.now();
    }

    if (isDrawing) {
        timer = SELECTION_TIMEOUT;
        ctx.lineTo(rightHand.x, rightHand.y);
        ctx.stroke();
    } else {
        isDrawing = true;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(rightHand.x, rightHand.y);
    }
}

function calculateSeconds(timeRemaining) {
    return Math.floor((timeRemaining % (1000 * 60)) / 1000);
}

function startTimer() {
    var end = new Date().getTime() + 32000; // Strange hack to get a 30 second timer
    var countdownTimer = document.getElementById('timer');
    var x = setInterval(function () {
        var now = new Date().getTime();
        var seconds = calculateSeconds(end - now);
        countdownTimer.innerHTML = seconds + 's';
        if (seconds <= 0) {
            clearInterval(x);
            submit();
        }
    }, 1000);
}

$(function () {
    // startTimer();
    startCursorTracking(drawingCallback);
    timer = SELECTION_TIMEOUT;
    lastCursorUpdateTime = Date.now();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    cursorElement = document.getElementById('cursor');
    // Read prompt from localStorage    
    prompt = localStorage.getItem('prompt');
    if (prompt) {
        document.getElementById('prompt').innerHTML = prompt;
    } else {
        r = choosePrompt();
        prompt = r.prompt;
        promptElement = r.promptElement;
    }
});



