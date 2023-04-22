// accessing display 1
const HAND_LEFT_JOINT_INDEX = 8
const HAND_RIGHT_JOINT_INDEX = 14
const CHEST = 2

var socket = new WebSocket("ws://cpsc484-02.yale.internal:8888/frames");
var host = "cpsc484-02.yale.internal:8888";

function addCursor() {
    const cursorElement = document.createElement('div'); // Create a new 'div' element for the cursor
    cursorElement.id = 'cursor'; // Set an ID for the cursor element, e.g., 'cursor'
    document.body.appendChild(cursorElement); // Append the cursor element to the body of the HTML document
}

function addErrorPopup() {
    const errorPopup = document.createElement('div'); // Create a new 'div' element for the error popup
    errorPopup.id = 'error-popup'; // Set an ID for the error popup element, e.g., 'error-popup'
    errorPopup.innerHTML = 'Please ensure that there is only one person in the frame'; // Set the inner HTML of the error popup element
    errorPopup.style.display = 'none'; // Set the display style of the error popup element to 'none'
    document.body.appendChild(errorPopup); // Append the error popup element to the body of the HTML document
}

function startCursorTracking(cursorMoveCallback) {
    addCursor();
    addErrorPopup();
    frames.start(cursorMoveCallback);
}

var frames = {
    socket: null,
    start: function (cursorMoveCallback) {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            let frameData = JSON.parse(event.data);

            const errorPopup = document.getElementById('error-popup');

            if (frameData.people.length > 1) { // Ensure that there is only one person in the frame
                errorPopup.style.display = 'block';
                return;
            }

            errorPopup.style.display = 'none';

            if (frameData.people.length == 0) { // Do nothing if there are no people in the frame
                return;
            }

            const handLeft = frameData.people[0].joints[HAND_LEFT_JOINT_INDEX]; // Get the left hand joint
            const handRight = frameData.people[0].joints[HAND_RIGHT_JOINT_INDEX]; // Get the right hand joint
            const chest = frameData.people[0].joints[CHEST];// Get the neck

            const leftHandValid = handLeft.valid; // Check if the left hand joint is valid
            const rightHandValid = handRight.valid; // Check if the right hand joint is valid
            const chestValid = chest.valid; // Check if the neck is valid

            if (!leftHandValid && !rightHandValid && !chestValid) {
                return;
            }

            const leftHandX = handLeft.position.x; // Get the x position of the left hand joint
            const leftHandY = handLeft.position.y; //  Get the y position of the left hand joint

            const rightHandX = handRight.position.x; // Get the x position of the right hand joint
            const rightHandY = handRight.position.y; // Get the y position of the right hand joint

    
            const chestY = chest.position.y; // Get the y position of the neck

            const cursorElement = document.getElementById('cursor');

            // Use right hand as cursor

            cursorElement.style.left = rightHandX + 'px';
            cursorElement.style.top = rightHandY + 'px';
            cursorMoveCallback({x: leftHandX, y: leftHandY}, {x: rightHandX, y: rightHandY}, {y: chestY});
        }
    },
    show: function (frame) {
        console.log(frame);
    }
};




