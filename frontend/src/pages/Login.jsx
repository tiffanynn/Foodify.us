import React, { useContext, useRef, useEffect, useState } from "react";
import { Card, Form, Button, FormGroup, Alert, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, usersCollection } from "../firebase.js";
import { useAuth } from "../config/Authentication.js";

import google from '../Images/google-logo-9824.png';
import lobster from '../Images/lobster.png';
import entre from '../Images/entre.png';

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
                    <Row>
                        <Col style={{
                            marginLeft: '500px'
                        }}>
                            <h1
                                style={{
                                    color: 'black',
                                    fontFamily: "Raleway",
                                    display: 'inline',
                                    flexDirection: 'column',
                                    textalign: 'left',
                                    position: 'relative',
                                    marginLeft: '-400px'
                                }}><b>Let's continue what we started</b>

                            </h1>
                            <div>
                                {error && <Alert variant="danger" style={{
                                    marginTop: '100px',
                                    flexDirection: 'column',
                                    opacity: '80%',
                                    timeout: 'opacity 100ms',
                                    display: 'inline',
                                    alignItems: 'right',
                                    textAlign: 'center',
                                    borderRadius: '400px',
                                    padding: '4px 93px',
                                    width: '340px'
                                }}
                                >{error}</Alert>}
                            </div>
                            <p style={{
                                color: '#000000',
                                marginLeft: '-400px',
                                marginTop: '50px',
                                fontSize: '23px'
                            }}>
                                - Don't have an account? -
                            </p>
                            <li style={{
                                margin: '10px',
                                color: 'black',
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'center',
                                position: 'relative',
                                fontSize: '22px',
                                marginLeft: '-400px',
                                marginTop: '20px'
                            }}>
                                <Link to="/Register">Register here</Link>
                            </li>

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
                                            height: '35px',
                                            width: '340px',
                                            display: 'inline',
                                            margin: '10px',
                                            marginTop: '40px',
                                            marginBottom: '30px',
                                            marginLeft: '-400px'
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
                                            height: '35px',
                                            width: '340px',
                                            display: 'inline',
                                            margin: '10px',
                                            marginBottom: '30px',
                                            marginLeft: '-400px'
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
                                        margin: '10px',
                                        marginLeft: '-400px'
                                    }}
                                    disabled={loading}>
                                    login
                                </Button>
                            </Form>
                        </Col>
                        <Col>
                            <img src={entre}
                                style={{
                                    align: "right",
                                    height: "1000px",
                                    width:"auto",
                                    // width: "640px",
                                    display: "inline",
                                    flexDirection: "column",
                                    position: "static",
                                    marginLeft: "-480px",
                                    marginTop: "-100px"
                                }}
                            >
                            </img>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </>
        
    )
}
