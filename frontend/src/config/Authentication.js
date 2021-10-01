// import React, {useContext, useState, useEffect} from 'react';
// import {auth} from '../firebase'; 
// // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// // import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// // const auth = getAuth();
// // signInWithPopup(auth, provider)
// //     .then((result) => {
// //         // This gives you a Google Access Token. You can use it to access the Google API.
// //         const credential = GoogleAuthProvider.credentialFromResult(result);
// //         const token = credential.accessToken;
// //         // The signed-in user info.
// //         const user = result.user;
// //         // ...
// //     }).catch((error) => {
// //         // Handle Errors here.
// //         const errorCode = error.code;
// //         const errorMessage = error.message;
// //         // The email of the user's account used.
// //         const email = error.email;
// //         // The AuthCredential type that was used.
// //         const credential = GoogleAuthProvider.credentialFromError(error);
// //         // ...
// //     });
// const AuthContext= React.createContext()

// export function useAuth(){
//     return useContext(AuthContext)
// }

// export function AuthProvider({children}){
//     const [currentUser, setCurrentUser] = useState()
//     function register(email, password){
//        return auth.createUserWithEmailAndPassword(email, password)
//     }

//     //only use when mount effect - only runs once
//     useEffect(()=> {
//         //allows to set user or null
//        const unsubscribe = auth.onAuthStateChanged(user => {
//             setCurrentUser(user)
//         })
//         return  unsubscribe
//     }, [])
    
//     const value = {
//         currentUser, 
//         register
//     }
//     return(
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     )
// }