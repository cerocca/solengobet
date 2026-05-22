importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// INSERISCI QUI LE TUE CHIAVI FIREBASE (Le stesse dell'HTML)
firebase.initializeApp({
	apiKey: "AIzaSyDT3u6tDam0JGP1G4iUThm8_7Xq_0jIITc",
	authDomain: "solengobet.firebaseapp.com",
	databaseURL: "https://solengobet-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "solengobet",
	storageBucket: "solengobet.firebasestorage.app",
	messagingSenderId: "749860636242",
	appId: "1:749860636242:web:019c602f6ed8c02bc1418b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Notifica in background: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐗</text></svg>'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});