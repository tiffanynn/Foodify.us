import firebase from "firebase";


const firebaseConfig ={
    apiKey: "AIzaSyD3BhvKJi3CdXbMYHszxXZ4hz_4IMvDYWg",
    authDomain: "foodify-e0ea5.firebaseapp.com",
    projectId: "foodify-e0ea5",
    storageBucket: "foodify-e0ea5.appspot.com",
    messagingSenderId: "25721209000",
    appId: "1:25721209000:web:6bab6224e8f81439bc829d",
    measurementId: "G-D4QGBMS0EN"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerWithEmailAndPassword = async (email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};
export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
};

/*******************************************************************/

// import firebase from 'firebase';
// import {initializeApp} from "firebase/compat/app";
// import { GoogleAuthProvider, auth} from "firebase/compat/auth";


// const firebaseConfig = {
//     apiKey: "AIzaSyD3BhvKJi3CdXbMYHszxXZ4hz_4IMvDYWg",
//     authDomain: "foodify-e0ea5.firebaseapp.com",
//     projectId: "foodify-e0ea5",
//     storageBucket: "foodify-e0ea5.appspot.com",
//     messagingSenderId: "25721209000",
//     appId: "1:25721209000:web:6bab6224e8f81439bc829d",
//     measurementId: "G-D4QGBMS0EN"
// };

// const app = firebase.initializeApp(firebaseConfig);
// const authe = app.auth();
// const db = app.firestore();





/******************************************************************** */



// // import { initializeApp } from 'firebase/app';
// // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// // const firebaseConfig = { 
// //     apiKey: "AIzaSyD3BhvKJi3CdXbMYHszxXZ4hz_4IMvDYWg",
// //     authDomain: "foodify-e0ea5.firebaseapp.com",
// //     projectId: "foodify-e0ea5",
// //     storageBucket: "foodify-e0ea5.appspot.com",
// //     messagingSenderId: "25721209000",
// //     appId: "1:25721209000:web:6bab6224e8f81439bc829d",
// //     measurementId: "G-D4QGBMS0EN"
// // };

// // export const app = initializeApp(firebaseConfig);
