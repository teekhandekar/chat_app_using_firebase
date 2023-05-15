importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');

const firebaseConfig = {
    apiKey: 'AIzaSyCYcHCdgc-tCeRXHRnZ8uVKENidMaHRL9s',
  authDomain: 'chat-application-611b3.firebaseapp.com',
  projectId: 'chat-application-611b3',
  storageBucket: 'chat-application-611b3.appspot.com',
  messagingSenderId: '284177842733',
  appId: '1:284177842733:web:e84335588fc1798f1a2ea4'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});





