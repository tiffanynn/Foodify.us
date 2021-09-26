import React, {useContext, useRef} from 'react';
import {Card, Form, Button, FormGroup} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {useAuth} from '../config/Authentication'
import logo from '../Images/google-logo-9824.png';
import food from '../Images/food.png';

export default function Register(){
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
                <img src={food}
                    align="left"
                    height="731px"
                    width="1033px"
                >
                </img>
                <Card.Body style={{ 
                    color:'white',
                    alignItems: 'left'
                }}>
                    <h1 
                        style={{color:'black', 
                                display:'flex',
                                flexDirection:'column',
                                textalign: 'right'
                                }}> 
                        Let's start a food journey 
                    </h1>
                    <Button type="googleAPI"
                        style={{
                            color: '#767575',
                            background:'white',
                            border: '1px solid #1DE19B',
                            borderRadius: '400px',
                            padding: '4px 87px',
                            alignItems: 'right',
                            height: '35px',
                            margin: '10px'
                        }}>
                            
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
                    <Form>
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
                            }}>
                            Register
                        </Button>
                        
                    </Form>
                </Card.Body>
            </Card>
            <li style = {{
                margin:'10px',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
            }}>
            <Link to="/Login">Already have an account? Login </Link>
            </li>
            
        </>
    )
}