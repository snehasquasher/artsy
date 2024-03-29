function renderDrawing(drawing, idx) {
	let containerId = 'gallery-image-container-' + idx;

	let imageContainer = document.createElement('div');
	imageContainer.className = 'gallery-image-container';
	imageContainer.id = containerId;

	document.getElementById('gallery').appendChild(imageContainer);

	let imageEl = document.createElement('img');
	imageEl.src = drawing.downloadUrl;
	imageEl.alt = drawing.prompt;
	imageEl.className = 'gallery-image';
	document.getElementById(containerId).appendChild(imageEl);

	const date = new Date(drawing.timeStamp);
	const dateEl = document.createElement('p');
	dateEl.innerHTML = date.toLocaleString();

	let promptEl = document.createElement('p');
	promptEl.innerHTML = drawing.prompt;
	promptEl.className = 'gallery-prompt';
	document.getElementById(containerId).appendChild(promptEl);
	// document.getElementById(containerId).appendChild(dateEl);
}

function renderGallery(drawings) {
	for (let i = 0; i < drawings.length; i++) {
		let drawing = drawings[i];
		renderDrawing(drawing, i);
	}
}

$(document).ready(function () {
	getDrawings().then(function (drawings) {
		renderGallery(drawings)

		const gallery = document.querySelector('.gallery');
		const items = document.querySelectorAll('.gallery-image-container');

		const numItems = items.length;
		const itemWidth = items[0].offsetWidth;
		const totalWidth = numItems * itemWidth;

		let itemIdx = 0;

		let currentPosition = 0;

		function moveItems() {
			currentPosition -= 1;
			if (currentPosition < -itemWidth * (numItems / 2)) {
				console.log('resetting');
				currentPosition += itemWidth;
				gallery.appendChild(items[itemIdx % numItems]);
				itemIdx++;
			}
			gallery.style.transform = `translateX(${currentPosition}px)`;
		}
		setInterval(moveItems, 30);
	})
})
