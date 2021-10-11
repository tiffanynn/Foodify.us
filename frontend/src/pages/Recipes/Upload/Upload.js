import { React, useRef } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import image from "../../../Images/food_cropped.png";

import "./Upload.css";
import "../Recipes.css";

export default function UploadRecipe() {
    const tags =["vegan", "keto friendly", "paleo", "atkins", "calorie lite",
        "pescatarian", "vegetarian"];
    const titleRef = useRef()
    const subTitleRef = useRef()
    const infoRef = useRef()

    return(
        <div>
    <Container className="mt-5"><h1>Write your food story:</h1>
    <Row><Col>
    <Form.Group id = "title">
                            <Form.Control 
                                type="textarea" 
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

    </Col><Col><Form.Group id = "body">
                            <Form.Control as="textarea"
                                type="body" 
                                placeholder = "enter recipe instructions here!" 
                                ref={infoRef} required 
                                style={{
                                    color: 'black',
                                    fontFamily: "Raleway",
                                    background: 'white',
                                    border: '1px solid #1DE19B',
                                    borderRadius: '40px',
                                    height: '360px',
                                    width: '500px'
                                }}>
                            </Form.Control>
                        </Form.Group></Col></Row>
    <Row><Col><div className="tagformat">{
        tags.map(item =><Button variant="outlined" id="outlined" className="tag">{item}</Button>)}</div>
    </Col>
    <Col xs={6}><div className="d-flex justify-content-left"><div className="tagtext">Any tags you'll like to add?</div></div></Col></Row>

    </Container>
    <div className="d-flex justify-content-end"><img src={image} style={{width: "auto", height: "600px"}}></img></div></div>
 
    )
}