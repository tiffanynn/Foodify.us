import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import Cards from "./Cards"

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { db, usersCollection } from "../firebase";

 export default function Profile() {
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const history = useHistory()
    const [dbData, setdbData] = useState([]); // retrieving firestore db info
    const updateEmailRef = useRef()
    const updatePasswordRef = useRef()
    const updateNameRef = useRef()
    const usernameRef = useRef()
    const isLogginActive = useRef()
    const isAnonymous = useRef()
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)

  // Displays Current user's information in console.log (WORKS)
  //  if (isLogginActive) {
  //     usersCollection.doc(currentUser.uid).get()
  //       .then((doc) => {
  //         if (doc.exists) {
  //           console.log("DATA: ", doc.data())
  //         }
  //         else {
  //           // console.log("ERROR")
  //         }
  //       }).catch(e => {
  //         console.log("ERROR GETTING DOC", e)
  //       })
  //   }
  //    else{
  //    isAnonymous = true
  //    history.push("/login")
  //   }
   async function handleSubmit(e) {
     e.preventDefault()

     try {
       setError("")
       setLoading(true)
       // Updates Auth but not DB
      const update = await updateEmail(updateEmailRef.current.value)
      if(update){
        console.log({ update })
        const userID = update.user.uid
        // const userData = {
        //   // displayName: nameRef.current.value,
        //   email: updateEmailRef.current.value
        //   // password: passwordRef.current.value,
        //   // username: ""
        //   // username: usernameRef.current.value
        // }
        usersCollection.doc(userID).update({
          "email": updateEmailRef.current.value
        }).then(()=>{
          console.log("Failed to update email")
        })
      }
     }
     catch{
       setError("Failed to update")
     }
     setLoading(false)
    }
      return (
        <div>
        
          <p>{currentUser && currentUser.email}</p>
          <Form id="update" onSubmit={handleSubmit}> 
            <Form.Group id="updateUser">
              <Form.Control
                type="updateEmail"
                placeholder="updateEmail"
                ref={updateEmailRef} required
                style={{
                  color: 'black',
                  background: 'white',
                  border: '1px solid #1DE19B',
                  borderRadius: '40px',
                  padding: '4px 18px',
                  alignItems: 'right',
                  height: '35px',
                  width: '360px',
                  display: 'inline',
                  margin: '10px'
                }}>
              </Form.Control>
            </Form.Group>
            <Button type="enter"
              style={{
                color: 'white',
                fontFamily: "Raleway",
                background: '#1DE19B',
                border: '2px solid #19B47C',
                borderRadius: '20px',
                padding: '6px 18px',
                alignItems: 'right',
                margin: '10px'
              }}
              disabled={loading}>
              enter
            </Button>
          </Form>
          <Cards />
          
        </div>
      );
  }
  
 