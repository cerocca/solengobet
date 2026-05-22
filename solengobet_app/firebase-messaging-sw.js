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
    console.log('Notifica in background ricevuta: ', payload);
    // Lasciamo che sia Firebase a mostrare la notifica in automatico!
    // Rimosso il comando manuale self.registration.showNotification per evitare il doppione.
});
