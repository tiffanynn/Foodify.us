import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import Cards from "./Cards"

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { db, usersCollection } from "../firebase";

 export default function Profile() {
    const {currentUser, updatePassword, updateEmail} = useAuth();
    const [dbData, setdbData] = useState([]); // retrieving firestore db info
    const updateEmailRef = useRef()
    const updatePasswordRef = useRef()
    const nameRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const isLogginActive = useRef()

  // Displays Current user's information in console.log (WORKS)
   if (isLogginActive) {
      usersCollection.doc(currentUser.uid).get()
        .then((doc) => {
          if (doc.exists) {
            console.log("DATA: ", doc.data())
          }
          else {
            console.log("ERROR")
          }
        }).catch(e => {
          console.log("ERROR GETTING DOC", e)
        })
    } else{
      history.push("/login")
    }
   async function handleSubmit(e) {
     e.preventDefault()

     try {
       setError("")
       setLoading(true)

       const em = await updateEmail(updateEmailRef.current.value)
       const pw = await updatePassword(updatePasswordRef.current.value)
       if (em && pw) {
         usersCollection.doc(currentUser.uid).update({
           email: updateEmailRef.current.value,
           password: updatePasswordRef.current.value
         })
           .then(() => {
             console.log('UPDATED');
           }).catch(e => {
             console.log('Error updating: ', e);
           });
       }
       history.push("/profile") //goes to home page
     } catch {
       setError("Failed UPDATE")
     }

     setLoading(false)
   }
   
      return (
        <div>
          <p>{currentUser && currentUser.email}</p>
          <Form id="info" onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                placeholder="email"
                ref={updateEmailRef} required
                style={{
                  color: 'black',
                  fontFamily: "Raleway",
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
            <Form.Group id="password">
              <Form.Control
                type="password"
                placeholder="password"
                ref={updatePasswordRef} required
                style={{
                  color: 'black',
                  fontFamily: "Raleway",
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
            <Button type="registerButton"
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
  
 