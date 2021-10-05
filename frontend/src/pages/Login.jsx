import React, { useContext, useRef, useEffect, useState } from "react";
import { Card, Form, Button, FormGroup } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";
import { useAuth } from "../config/Authentication.js";

import google from '../Images/google-logo-9824.png';
import avo2 from '../Images/avo2.png';

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
            history.push("/profile") //goes to profile page
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body style={{
                    color: 'white',
                    alignItems: 'right'
                }}>
                    <img src={avo2}
                        align="right"
                        height="500px"
                        width="700px"
                        display="inline"
                        flexDirection="column"
                        // height="363px"
                        // width="513px"
                    >
                    </img>
                    <h1
                        style={{
                            color: 'black',
                            font: "Raleway",
                            display: 'inline',
                            flexDirection: 'column',
                            textalign: 'left'
                        }}>
                        Let's continue what we started
                    </h1>
                    <li style={{
                        margin: '10px',
                        color: 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        fontSize: '22px'
                    }}>
                        <Link to="/Register">Don't have an account? Register here </Link>
                    </li>
                    <Button type="googleAPI"
                        style={{
                            color: '#767575',
                            background: 'white',
                            border: '1px solid #1DE19B',
                            borderRadius: '400px',
                            padding: '4px 93px',
                            alignItems: 'right',
                            height:'35px',
                            margin: '10px'
                        }}
                        // onClick={signInWithGoogle}>
                        >

                        Login with Google
                        <img src={google}
                            align="right"
                            width="28px"
                            height="25px">
                        </img>

                    </Button>
                    <p style={{
                        color: '#767575',
                        margin: '5px',
                        fontSize: '15px'
                    }}>
                        - OR -
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Control
                                type="email"
                                placeholder="email"
                                ref={emailRef} required
                                style={{
                                    color: 'black',
                                    background: 'white',
                                    border: '1px solid #1DE19B',
                                    borderRadius: '40px',
                                    padding: '4px 18px',
                                    alignItems: 'right',
                                    height:'25px',
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
                                    border: '1px solid #1DE19B',
                                    borderRadius: '40px',
                                    padding: '4px 18px',
                                    alignItems: 'right',
                                    height:'25px',
                                    margin: '10px'
                                }}>
                            </Form.Control>
                        </Form.Group>
                        <Button type="loginButton"
                            style={{
                                color: 'white',
                                background: '#1DE19B',
                                border: '2px solid #19B47C',
                                borderRadius: '20px',
                                padding: '6px 18px',
                                alignItems: 'right',
                                margin: '10px'
                            }}
                            onClick={login}>
                            Login
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
            
        </>
    )
}
