import {initializeApp} from 'firebase'

const app = initializeApp({
    apiKey: "AIzaSyDGf9KQAvKNwZl9FIXQ43wQ7_bXuNKejC8",
    authDomain: "phonebookvueapp-6836b.firebaseapp.com",
    databaseURL: "https://phonebookvueapp-6836b.firebaseio.com",
    projectId: "phonebookvueapp-6836b",
    storageBucket: "",
    messagingSenderId: "81181233986"
  });


export const db = app.database();
export const contactsRef = db.ref('contacts')