import React, {useContext, useRef, useEffect, useState} from "react";
import {Card, Form, Button, FormGroup, Alert} from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth, app, db, firebase, usersCollection } from "../firebase.js";
import { useAuth, AuthPage } from "../config/Authentication.js";

import logo from '../Images/google-logo-9824.png';
import food from '../Images/food.png';

import { Fragment as _Fragment } from "react/jsx-dev-runtime";

export default function Register(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const provider = useRef()
    const { signup, currentUser } = useAuth()
    // const { authWithGoogle } = AuthPage()
    const [error, setError] = useState("")
 
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [users, setUsers] = useState()


    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
       
          const reg = await signup(emailRef.current.value, passwordRef.current.value)
            if (reg){
                console.log({reg})
                const userID = reg.user.uid
                const userData = {
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                }
                usersCollection.doc(userID).set(userData)
                    .then(() => {
                        console.log('User successfully added to the FireBase DB!');
                        //console.log("NEW USER ID: " ,userID);
                        console.log('ATTEMPTING ADDING USER TO MONGODB')
                        fetch(`http://localhost:5000/usersignup/${userID}/${userData.name}`)
                        .then((response) => response.json())
                        .then((response)=> console.log(response))
                        // Setting recipe Data to the data that we received from the response above

                    }).catch(e => {
                        console.log('Error adding user to the DB: ', e);
                    });
            }
        // Query for username field to make sure it's unique
        //   usersCollection.where('username', '==', usernameRef.current.value).get()
        //       .then(doc => {
        //           if (!doc.empty) {
        //               console.log("Username already in use - Failed to create an account")
        //               alert("Username already in use - Failed to create an account")
        //           } else {
        //               // reg & add users - username not taken
        //               usersCollection.doc(userID).set(userData)
        //                   .then(() => {
        //                       console.log('User successfully added to the Firebase DB!');
        //                       //console.log("NEW USER ID: " ,userID);
        //                       console.log('ATTEMPTING ADDING USER TO MONGODB')
        //                       fetch(`http://localhost:5000/usersignup/${userID}/${userData.name}`)
        //                           .then((response) => response.json())
        //                           .then((response) => console.log(response))
        //                       // Setting recipe Data to the data that we received from the response above

        //                   }).catch(e => {
        //                       console.log('Error adding user to the DB: ', e);
        //                   });
        //           }
        //       })
            
        history.push("/profile") //goes to home page
      } catch {
        setError("Failed to create an account")
      }
  
      setLoading(false)
    }
   
    return (
        <>
            <Card style={{
                border: 'white'
            }}>
                <Card.Body style={{
                    margin: '100px',
                    color: 'white',
                    border: 'white',
                    alignItems: 'left'
                }}>
                    <img src={food}
                        align="left"
                        height="510px"
                        width="810px"
                        display="inline"
                        flexdirection="column"
                    >
                    </img>

                    <h1
                        style={{

                            color:'black', 
                            fontFamily: "Raleway",
                            display:'inline',
                            flexDirection:'column',
                            textalign: 'right',
                            margin: '10px'
                        }}> <b>Let's begin our journey </b>
                    </h1>
                    <div>
                        {error && <Alert variant="danger" style={{
                            marginTop: '200px',
                            flexDirection: 'column',
                            opacity: '80%',
                            timeout: 'opacity 100ms',
                            display: 'inline',
                            alignItems: 'right',
                            textAlign: 'center',
                            borderRadius: '400px',
                            padding: '4px 93px',
                            width: '330px'
                            // display: 'inline',
                            // flexDirection: 'column'

                        }}
                        >{error}</Alert>}
                    </div>
                    <li style={{
                        margin: '10px',
                        color: 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        fontSize: '22px'
                    }}>
                        <Link to="/Login">  Already have an account? Login here </Link>
                    </li>
                    {/* <Button type="googleAPI"
                        style={{
                            color: '#767575',
                            background: 'white',
                            fontFamily: "Raleway",
                            background:'white',
                            border: '1px solid #1DE19B',
                            borderRadius: '400px',
                            padding: '4px 93px',
                            alignItems: 'left',
                            height: '35px',
                            width: 'auto',
                            margin: '10px'
                        }}
                    // onClick={googlesignin}
                    >

                        Register with Google
                        <img src={logo}
                            align="right"
                            width="28px"
                            height="25px">
                        </img>

                    </Button> */}
                    {/* <p style={{
                        color: '#767575',
                        margin: '5px',
                        fontSize: '15px'
                    }}>
                        - OR -
                    </p> */}
                    <Form id="info" onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Control
                                type="name"
                                placeholder="name"
                                ref={nameRef} required
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
                        <Form.Group id="email">
                            <Form.Control
                                type="email"
                                placeholder="email"
                                ref={emailRef} required
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
                                ref={passwordRef} required
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
                                background:'#1DE19B',
                                border:'2px solid #19B47C',
                                borderRadius:'20px',
                                padding: '6px 18px',
                                alignItems: 'right',
                                margin: '10px'
                            }}
                            disabled={loading}>
                            register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>

    )
}

/************************Attempt 2********************************** */
// //Create a new collection & doc manually
// db.collection('users').add({
//     displayName: 'Choo',
//     email: 'choo@example.com',
//     password: '1234'
// })
// .then((docRef)=>{
//     console.log("Written with ID: ", docRef.id)
// })
// .catch((error)=>{
//     console.error("Error", error)
// })


// // read data
// const snapshot = await db.collection('users').get()
// snapshot.forEach((doc)=>{
//     console.log(doc.id, '=>', doc.data())
// })

/***********************Attempt 1*********************************** */

// Retrieving data from a document in firebase : WORKS
// db.collection('users').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc =>{
//         console.log(doc.data())
//         // renderUser(doc)
//     })
// })

/************************************************************************/