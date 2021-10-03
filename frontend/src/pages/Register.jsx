import React, {useContext, useRef, useEffect, useState} from "react";
import {Card, Form, Button, FormGroup} from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import { useAuth } from "../config/Authentication.js";

import logo from '../Images/google-logo-9824.png';
import food from '../Images/food.png';

export default function Register(){
    const emailRef = useRef()
    const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
    //   if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //     return setError("Passwords do not match")
    //   }
  
      try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        history.push("/")
      } catch {
        setError("Failed to create an account")
      }
  
      setLoading(false)
    }
   
    return (
        <> 
            <Card>
                <Card.Body style={{ 
                    color:'white',
                    alignItems: 'left'
                }}>
                    <img src={food}
                        align="left"
                        height="510px"
                        width="810px"
                        display="inline"
                        flexDirection="column"
                    >
                    </img>
                    <h1 
                        style={{
                            color:'black', 
                            display:'inline',
                            flexDirection:'column',
                            textalign: 'right'
                        }}> 
                        Let's begin our journey 
                    </h1>
                    {currentUser && currentUser.email}
                    <li style={{
                        margin: '10px',
                        color: 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        fontSize: '22px'
                    }}>
                        Already have an account? <Link to="/Login">Login</Link> here
                    </li>
                    <Button type="googleAPI"
                        style={{
                            color: '#767575',
                            background:'white',
                            border: '1px solid #1DE19B',
                            borderRadius: '400px',
                            padding: '4px 87px',
                            alignItems: 'left',
                            height: '35px',
                            margin: '10px'
                        }}
                        // onClick={signInWithGoogle}>
                        >
                            
                        Register with Google 
                        <img src={logo} 
                            align="right" 
                            width="28px" 
                            height="25px">
                        </img>
                         
                    </Button>
                    <p style={{ 
                            color:'#767575',
                            margin:'5px',
                            fontSize: '15px'
                    }}>
                        - OR -
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Control 
                                type="email" 
                                placeholder = "email" 
                                ref={emailRef} required 
                                style={{
                                    color: 'black',
                                    background: 'white',
                                    border: '1px solid #1DE19B',
                                    borderRadius: '40px',
                                    padding: '4px 18px',
                                    alignItems: 'right',
                                    height: '25px',
                                    margin: '10px'
                                }}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Control 
                                type="password" 
                                placeholder = "password" 
                                ref={passwordRef} required
                                style={{
                                    color: 'black',
                                    background: 'white',
                                    border: '1px solid #1DE19B',
                                    borderRadius: '40px',
                                    padding: '4px 18px',
                                    alignItems: 'right',
                                    height: '25px',
                                    margin: '10px'
                                }}>
                            </Form.Control>
                        </Form.Group>
                        <Button type="registerButton" 
                            style={{
                                color: 'white',
                                background:'#1DE19B',
                                border:'2px solid #19B47C',
                                borderRadius:'20px',
                                padding: '6px 18px',
                                alignItems: 'right',
                                margin:'10px'
                            }}
                            onClick={signup}>
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
        
    )
}