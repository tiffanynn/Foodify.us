import React from "react";
import { Container, Button, Row, Col, Form, Image } from "react-bootstrap";
import image from "../Images/food2.png";

import "./EditProfile.css";

function EditProfile() {
    return (
      <div>
          <Row>

            <Col lg={2}>
                <Image src="https://64.media.tumblr.com/2f9e574d84ab082f1f16b96812d38c75/tumblr_oappq7XwlE1utr0aro8_250.png" width={100} height= {100}
                    roundedCircle />
                <br></br>   
                <Button variant="outlined" id="outlined">Change Profile Photo</Button><br></br>
            </Col>

            <Col>
                <div class="box">
                    <div>Name</div>

                    <Form.Group className="mb-3">
                    <Form.Control 
                        type="name" 
                        placeholder="Enter name"  //Could be replaced with current name
                        style={{
                            color: 'black',
                            fontFamily: "Raleway",
                            background: 'white',
                            padding: '4px 18px',
                            height: '35px',
                            width: '800px',
                        }}
                    />
                    </Form.Group>
                    
                    <div>Email Address</div>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email"  //could be replaced with current username
                            style={{
                                color: 'black',
                                fontFamily: "Raleway",
                                background: 'white',
                                padding: '4px 18px',
                                height: '35px',
                                width: '800px',
                            }}
                        />
                    </Form.Group>

                    <div>Bio</div>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="bio" 
                            placeholder="Enter bio"  //could be replaced with current username
                            style={{
                                color: 'black',
                                fontFamily: "Raleway",
                                background: 'white',
                                padding: '4px 18px',
                                height: '35px',
                                width: '800px',
                            }}
                        />
                    </Form.Group>

                </div>
            </Col>
        </Row>

        <div className="d-flex justify-content-end"><img src={image} style={{width: "auto", height: "600px"}}></img></div>
       
      </div>
    );
  }
  
  export default EditProfile;