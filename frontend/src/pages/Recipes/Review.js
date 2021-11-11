import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./Recipes.css";

export default function Reviews(){
    return (
        <div>
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
        </div>
      );
}
