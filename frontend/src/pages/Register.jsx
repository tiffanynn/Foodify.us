import React, {useContext, useRef, useEffect, useState} from "react";
import {Card, Form, Button, FormGroup} from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "./firebase";

import logo from '../Images/google-logo-9824.png';
import food from '../Images/food.png';

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    const register = () => {
        if(!emailRef) alert("Please enter your email address");
        registerWithEmailAndPassword(emailRef, passwordRef);
    };

    useEffect(()=>{
        if(loading) return;
        if(user) history.replace("/profile");
    }, [user, loading]);
   
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
                        onClick={signInWithGoogle}>
                            
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
                                value={email} 
                                onChange={(e)=> setEmail(e.target.value)}
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
                                value={password} 
                                onChange={(e)=> setPassword(e.target.value)} 
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
                            onClick={register}>
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
        
    )
}