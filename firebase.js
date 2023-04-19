var firebaseConfig = {
	apiKey: "AIzaSyDPgizozUbkYwQIztWVRl6EgZMoq6WdXPo",
	authDomain: "artsy-d792c.firebaseapp.com",
	projectId: "artsy-d792c",
	storageBucket: "artsy-d792c.appspot.com",
	messagingSenderId: "482830049581",
	appId: "1:482830049581:web:7f0b37d5198a91aede73a4",
	measurementId: "G-4J33Q83M3F",
}

firebase.initializeApp(firebaseConfig)

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


