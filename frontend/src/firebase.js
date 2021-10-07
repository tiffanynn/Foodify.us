import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyD3BhvKJi3CdXbMYHszxXZ4hz_4IMvDYWg",
    authDomain: "foodify-e0ea5.firebaseapp.com",
    projectId: "foodify-e0ea5",
    storageBucket: "foodify-e0ea5.appspot.com",
    databaseURL: "https://foodify.firebaseio.com",
    messagingSenderId: "25721209000",
    appId: "1:25721209000:web:6bab6224e8f81439bc829d",
    measurementId: "G-D4QGBMS0EN"
});

export const auth = app.auth()
export const db = app.firestore()
db.settings({Snapshots: true})
export const provider = new firebase.auth.GoogleAuthProvider()
export default app