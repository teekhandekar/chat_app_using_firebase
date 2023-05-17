// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Firebase configuration values
  apiKey: "AIzaSyCYcHCdgc-tCeRXHRnZ8uVKENidMaHRL9s",
  authDomain: "chat-application-611b3.firebaseapp.com",
  databaseURL: "https://chat-application-611b3-default-rtdb.firebaseio.com",
  projectId: "chat-application-611b3",
  storageBucket: "chat-application-611b3.appspot.com",
  messagingSenderId: "284177842733",
  appId: "1:284177842733:web:e84335588fc1798f1a2ea4",
  measurementId: "G-G3Q54RCYP6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Add the public key generated from the console here
messaging.getToken({ vapidKey: 'BCwqgtigBpK88NqLlqcE9qaadpvWFHjKC5-t0wIq5lx7qnDXfFkz-VXtYK7Of2h_w1qQLIVs_Pm-pIFowJMQ6WU' }).then((currentToken) => {
  if (currentToken) {
    console.log(currentToken);
    // Send the token to your server and update the UI if necessary
  } else {
    console.log('No registration token available. Request permission to generate one.');
    // Show permission request UI
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

// Callback fired if Instance ID token is updated
messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    console.log('Token refreshed.');
    // Send Instance ID token to app server
    sendTokenToServer(refreshedToken);
    // Update UI with new token
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    // showToken('Unable to retrieve refreshed token ', err);
  });
});

// Handle incoming messages
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});

function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer(currentToken)) {
    console.log('Sending token to server...');
    // Send the current token to your server here
    setTokenSentToServer(currentToken);
  } else {
    console.log('Token already sent to server so won\'t send it again unless it changes');
  }
}

function isTokenSentToServer(currentToken) {
  return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
  window.localStorage.setItem('sentFirebaseMessagingToken', currentToken);
}

const database = firebase.database();

function createRoom() {
  var roomName = $('#room-name').val();
  if (roomName.trim() !== '') {
    var newRoomKey = firebase.database().ref().child('rooms').push().key;
    console.log("New room key: " + newRoomKey);
    var updates = {};
    updates['/rooms/' + newRoomKey] = { name: roomName };
    console.log("Updates: ", updates);
    firebase.database().ref().update(updates)
      .then(() => {
        console.log("Room created successfully");
        $('#room-name').val('');
      })
      .catch((error) => {
        console.error("Error creating room: ", error);
      });


  }
}

function loadRooms() {
  var roomsRef = firebase.database().ref('rooms');
  roomsRef.on('child_added', function (snapshot) {
    var room = snapshot.val();
    var roomId = snapshot.key;
    var roomLink = document.createElement('a');
    roomLink.href = 'chat.html?roomId=' + roomId;
    roomLink.innerHTML = room.name;
    var roomListElement = document.createElement('li');
    roomListElement.appendChild(roomLink);
    $('#room-list').append(roomListElement);
  });
}

$(document).ready(function () {
  loadRooms();
  $('#create-room').click(createRoom);
});

// End of code