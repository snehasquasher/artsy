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

var db = firebase.firestore()

function storeImageMetadata(downloadUrl, filename, prompt, time) {
	console.log("Storing image");
	var collectionRef = db.collection('drawings');
	var data = {
		downloadUrl: downloadUrl,
		filename: filename,
		prompt: prompt,
		timeStamp: time
	}
	return collectionRef.add(data).then(function (docRef) {
		console.log("Document written with ID: ", docRef.id);
	}).catch((error) => {
		console.error("Error adding document: ", error);
	})
}

// Function to add a new image to the database
function storeImage(image, prompt, timestamp) {
	const fileName = timestamp + prompt + '.png';
	var imageRef = storageRef.child('drawings/' + fileName);
	return imageRef.put(image).then(function (snapshot) {
		return snapshot.ref.getDownloadURL().then((url) => {
			return storeImageMetadata(url, fileName, prompt, timestamp)
		}).catch((error) => {
			console.log(error)
		})
	}).catch(function (error) {
		console.log(error);
	});
}


function getDrawings() {
	var collectionsRef = db.collection('drawings');
	return collectionsRef.get().then((querySnapshot) => {
		let imageData = [];
		querySnapshot.forEach((doc) => {
			imageData.push(doc.data());
		})
		return imageData;
	})
}
