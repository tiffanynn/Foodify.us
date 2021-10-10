import { React, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import image from "../../../Images/food.png";

import "./Upload.css";

export default function UploadRecipe() {
    const titleRef = useRef()
    const subTitleRef = useRef()

    return(
        <div>
    <Container className="mt-5"><h1>Write your food story:</h1>
    <Row><Col>
    <Form.Group id = "title">
                            <Form.Control 
                                type="title" 
                                placeholder = "title" 
                                ref={titleRef} required 
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
                        <Form.Group id = "title">
                            <Form.Control 
                                type="title" 
                                placeholder = "sub title" 
                                ref={subTitleRef} required 
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

    </Col><Col>Text</Col></Row>
    <Row><Col>Tags</Col>
    <Col>Any tags you'll like to add?</Col></Row>

    </Container>
    <div className="d-flex justify-content-end"><img src={image} style={{width: "auto", height: "600px"}}></img></div></div>
 
    )
}