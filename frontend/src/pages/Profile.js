import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import Cards from "./Cards"

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { db, usersCollection } from "../firebase";

 export default function Profile() {
    const {logout, currentUser, login, signup} = useAuth();
    const [data, setData] = useState([]); // retrieving firestore db info
    const history = useHistory();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
   const emailRef = useRef()
   const passwordRef = useRef()
   const nameRef = useRef()

    async function logoutSession(){
      setError("")
      try{
        await logout()
        history.push("/Login")
        // const check = signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
        // if (check){
        //   const userID = check.user.uid
        //   const userData = {
        //     name: nameRef.current.value,
        //     email: emailRef.current.value,
        //     password: passwordRef.current.value
        //   }
        //   usersCollection.doc(userID)
        //     .get(userData)
        //     .then(function (doc) {
        //       if (doc.exists) {
        //         console.log("Data: ", doc.data())
        //       } else {
        //         console.log("No doc!!!!")
        //       }
        //     }).catch((error) => {
        //       console.log("Error getting cached document:", error)
        //     })
        // }
        
      }catch{
        setError("Can't Logout")
      }
      
    }
    useEffect(() => {
      const getUserData = [];
      const userDB = usersCollection.onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          getUserData.push({
            ...doc.data(),
            key: doc.id,
          })
        })
        setData(getUserData)
        setLoading(false)
      })
      return() => userDB();
    }, [loading])
   
    if (loading){
      return <h1>LOADING</h1>
    }
  //  db.collection('users').onSnapshot(snapshot => {
  //     setData(snapshot.docs.map(doc=>({
  //       id:doc.uid, 
  //       users:doc.data(users)
  //     })))
  //  })
      return (
        <div>
          <Button onClick={logoutSession} style={{
            align:'right',
            alignItems: 'right'
          }}>
            Logout 
          </Button>
          
         
          <p> {currentUser && currentUser.email} </p>
          {data.length > 0 ? (
            data.map((data) => <div key={data.key}>{data.answer}</div>)
          ) : (
            <h1>no answers yet :(</h1>
          )}
          {/* {posts.map((item)=>)} */}
          
          <Cards />
          
        </div>
      );
  }
  
 