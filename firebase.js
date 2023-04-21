var storage = firebase.storage()

var storageRef = storage.ref()

// Function to add a new image to the database
function addImage(image, fileName) {
	var imageRef = storageRef.child('drawings/' + fileName);
	// Upload the file to the Firebase Storage bucket
	return imageRef.put(image).then(function(snapshot) {
		console.log('Uploaded a blob or file!');
	}).catch(function(error) {
		console.log(error);
	});
}


