var canvas;
var ctx;
var isDrawing = false;
var cursorElement;
var prompt;

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
    console.log("Submit button clicked")
    if (!canvas) {
        return
    }
    var image = new Image()
    image.src = canvas.toDataURL('image/jpg');
    const blob = dataURItoBlob(image.src);

    const date = new Date();
    const timestamp = date.getTime();

    var fileName = timestamp + prompt + '.png';
    addImage(blob, fileName);
}

function drawingCallback(_, rightHand) {
    rightHand.x = Math.random() * 1000;
    rightHand.y = Math.random() * 1000;

    // Get the top corner of the canvas
    let x = rightHand.x - canvas.offsetLeft;
    let y = rightHand.y - canvas.offsetTop;

    cursorElement.style.left = rightHand.x + 'px';
    cursorElement.style.top = rightHand.y + 'px';

    if (isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        isDrawing = true;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

$(document).ready(function () {
    startCursorTracking(drawingCallback);
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    cursorElement = document.getElementById('cursor');
    // Read prompt from localStorage    
    prompt = localStorage.getItem('prompt');
    if (prompt) {
        document.getElementById('prompt').innerHTML = prompt;
    } else {
        prompt = choosePrompt();
    }
});



