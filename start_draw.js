var canvas;
var ctx;
var isDrawing = false;
var cursorElement;
var prompt;
var promptElement;
var strokeColor;

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

function drawingCallback(_, rightHand) {
    // Get the top corner of the canvas
    rightHand.x = canvas.getBoundingClientRect().right - rightHand.x;

    cursorElement.style.left = rightHand.x + 'px';
    cursorElement.style.top = rightHand.y + 'px';

    if (isDrawing) {
        ctx.lineTo(rightHand.x, rightHand.y);
        ctx.stroke();
    } else {
        isDrawing = true;
        ctx.globalAlpha = 0.3
        ctx.lineWidth = 30;
        ctx.lineCap = 'round';
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
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    cursorElement = document.getElementById('cursor');
    // Read prompt from localStorage    
    prompt = localStorage.getItem('prompt');
    strokeColor = localStorage.getItem('strokeColor');
    if (prompt) {
        document.getElementById('prompt').innerHTML = prompt;
    } else {
        r = choosePrompt();
        prompt = r.prompt.emotion;
        strokeColor = r.prompt.color;
        promptElement = r.promptElement;
    }
    
    ctx.strokeStyle = strokeColor;
    startCursorTracking(drawingCallback);
});



