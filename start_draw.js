function redirect () {
    var interval = setInterval(myURL, 5000);
 }

function myURL() {
    window.location.href = 'prompt.html';
    clearInterval(interval);
 }
