var qrCodeContainer = document.getElementById('qrCodeContainer');
downloadUrl = localStorage.getItem('downloadUrl');

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

var button = document.getElementById('button');
button.addEventListener('click', function () {
	window.location.href = 'AddToHomeScreen.html';
});