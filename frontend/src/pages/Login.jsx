import React, { useContext, useRef } from 'react';
import { Card, Form, Button, FormGroup } from 'react-bootstrap';
import { useAuth } from '../config/Authentication'
import logo from '../Images/google-logo-9824.png';

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
                        <img src={logo}
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
            <div className="link" style={{
                margin: '10px',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
            }}>
                Don't have an account? Register here
            </div>
        </>
    )
}
