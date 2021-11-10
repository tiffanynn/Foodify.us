import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";
import image from "../../Images/Rectangle 2.png";

import "./Recipes.css";

export default function Reviews(){
    return (
        <div>
          <Container className="mt-5">
            <Row>
              <Col lg={2}>

              </Col>
              <Col>
                <Row className="d-flex justify-content-between align-items-start">
                  <Col xs={6} lg={6}>
                    
                  </Col>
                  <Col>
                    
                  </Col>
                </Row>
    
                <Row>
                  <Col>
                    
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        
                      </Col>
                      <Col>
                        
                      </Col>
                    </Row>
                    <Row></Row>
                    
                  </Col>
                </Row>
    
                <div className="mt-3">
                  <Button variant="outlined" id="leave_review" className="mx-3">
                    Leave a Review
                  </Button>
                  <Button variant="text" id="save">
                    Save
                  </Button>
                </div>
                <Row>
                  <Col xs={6}>
                    <h2>Reviews and Remarks</h2>
                    hello world
                    <div className="review">
                      <div className="review_text">
                        <div className="reviews">
                          feel like cooking? leave your thoughts?
                        </div>
                        <div className="rating">_/5 stars</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>{" "}
          <div className="d-flex justify-content-end">
            <img src={image} style={{ width: "auto", height: "600px" }}></img>
          </div>
        </div>
      );
}
