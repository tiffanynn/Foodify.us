import React, { useContext, useRef } from 'react';
import { Card, Form, Button, FormGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuth } from '../config/Authentication'
import google from '../Images/google-logo-9824.png';
import login from '../Images/login.png';
import signup from '../Images/signup.png';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    // const {register} = useAuth()

    // function handleSubmit(e){
    //     e.preventDefault()

    //     register(emailRef.current.value, passwordRef.current.value)
    // }
    return (
        <>
            <Card>
                
                    {/* <img src={login}
                        align="left"
                        width="300px"
                        rotate="right"
                        >
                    </img> */}
                
                <Card.Body style={{
                    color: 'white',
                    alignItems: 'left'
                }}>
                    <h1
                        style={{
                            color: 'black',
                            display: 'flex',
                            flexDirection: 'column',
                            textalign: 'left'
                        }}>
                        Let's continue what we started
                    </h1>
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
                        }}>

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
                    <Form>
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
                            }}>
                            Login
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
            <li style = {{
                margin: '10px',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
            }}> 
            <Link to="/Register">Don't have an account? Register here </Link>
            </li>
        </>
    )
}
