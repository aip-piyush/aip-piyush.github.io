importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBY1uRyXC6d9eN83Cl4PMa6cM3fDVHcT2o",
   authDomain: "flutter-bloc-structure.firebaseapp.com",
  // databaseURL: "https://flutter-bloc-structure-default-rtdb.firebaseio.com",
   projectId: "flutter-bloc-structure",
   storageBucket: "flutter-bloc-structure.appspot.com",
   messagingSenderId: "706018329144",
   appId: "1:706018329144:web:0a124d0646d3faf0325ccd",
   measurementId: "G-C3N3X0318Z"
};



firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

let darkPatternsValue = 0;

self.addEventListener('message', function(event){
  if (event.data && event.data.type === 'SET_DARK_PATTERNS_VALUE') {
    darkPatternsValue = event.data.value;
  }
});

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    if(darkPatternsValue != 1){
      return;
    }
    lastNotificationId = currentNotificationId;

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
      };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked ', event);
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/?source=notification')
    );
 });
