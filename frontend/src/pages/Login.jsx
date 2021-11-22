import React, { useContext, useRef, useEffect, useState } from "react";
import { Card, Form, Button, FormGroup, Alert } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, usersCollection } from "../firebase.js";
import { useAuth } from "../config/Authentication.js";

import google from '../Images/google-logo-9824.png';
import avo2 from '../Images/lobster.png';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    
    const { login, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/") //goes to the Home page
        } catch {
            setError("Failed to login")
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
                    alignItems: 'right',
                    position: 'relative'
                }}>
                    <img src={avo2}
                        align="right"
                        height="450px"
                        width="700px"
                        display="inline"
                        flexDirection="column"
                        position="relative"
                        // height="363px"
                        // width="513px"
                    >
                    </img>
                    <h1
                        style={{
                            color: 'black',
                            fontFamily: "Raleway",
                            display: 'inline',
                            flexDirection: 'column',
                            textalign: 'left',
                            position:'relative'
                        }}><b>Let's continue what we started</b>
                        
                    </h1>
                    <div>
                        {error && <Alert variant="danger" style={{
                            marginTop: '100px',
                            flexDirection: 'column',
                            opacity: '80%',
                            timeout:'opacity 100ms',
                            display: 'inline',
                            alignItems: 'right',
                            textAlign: 'center',
                            borderRadius: '400px',
                            padding: '4px 93px',
                            width: '340px'
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
                        position: 'relative',
                        fontSize: '22px'
                    }}>
                        <Link to="/Register">Don't have an account? Register here </Link>
                    </li>
                    {/* <Button type="googleAPI"
                        style={{
                            color: '#767575',
                            background: 'white',
                            fontFamily: "Raleway",
                            border: '1px solid #1DE19B',
                            borderRadius: '400px',
                            padding: '4px 93px',
                            alignItems: 'right',
                            height:'35px',
                            width:'auto',
                            display: 'inline',
                            margin: '10px'
                        }}
                        // onClick={signInWithGoogle}>
                        >

                        Login with Google
                        <img src={google}
                            align="right"
                            width="auto"
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
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Control
                                type="email"
                                placeholder="email"
                                ref={emailRef} required
                                style={{
                                    color: 'black',
                                    background: 'white',
                                    fontFamily: "Raleway",
                                    border: '1px solid #1DE19B',
                                    borderRadius: '40px',
                                    padding: '14px 18px',
                                    alignItems: 'right',
                                    height:'35px',
                                    width: '340px',
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
                                    background: 'white',
                                    fontFamily: "Raleway",
                                    border: '1px solid #1DE19B',
                                    borderRadius: '40px',
                                    padding: '14px 18px',
                                    alignItems: 'right',
                                    height:'35px',
                                    width: '340px',
                                    display: 'inline',
                                    margin: '10px'
                                }}>
                            </Form.Control>
                        </Form.Group>
                        <Button type="loginButton"
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
                            login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            
        </>
    )
}
