var qrCodeContainer = document.getElementById('qrCodeContainer');
var downloadUrl = localStorage.getItem('downloadUrl');

var qrCode = new QRCode(qrCodeContainer, {
    text: downloadUrl || 'https://www.google.com',
    width: 256,
    height: 256,
    colorDark: 'darkblue',
    colorLight: 'lightblue',
    correctLevel: QRCode.CorrectLevel.H,
});

qrCodeContainer.style.display = 'block';
qrCodeContainer.style.margin = 'auto';

// var countdownElement = document.getElementById("barcode_countdown");
// var countdownValue = 20;
// var countdownInterval = setInterval(function() {
//     countdownValue--;
//     countdownElement.textContent = countdownValue;
//     if (countdownValue <= 0) {
//         clearInterval(countdownInterval);
//         window.location.href = 'index.html';
//     }
// }, 1000);
function redirect () {
	window.location.href = 'index.html';
  }
  
  setTimeout(redirect, 10000);