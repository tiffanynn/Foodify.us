import React, { useEffect, useState } from "react";
// import { Button } from "@material-ui/core";
import { Container, Row, Col, Image, InputGroup, FormControl, ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";

import "./Recipes.css";

export default function Reviews(){
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')

    const handleStateChange = (e, setState) => {
        setState(e.target.value)      
    }

    const handleRatingChange = (value, setState) => {
      setState(value)
    }

    const handleSubmit = (e) => {
      // logic to save to database
    }
    

    return (
        <div>
                <div className="mt-3">
                  {/* <Button variant="outlined" id="leave_review" className="mx-3">
                    Leave a Review
                  </Button>
                  <Button variant="text" id="save">
                    Save
                  </Button> */}
                </div>
                <Row>
                  <Col>
                    <h2>Reviews and Remarks</h2>

                    <InputGroup>
                      <FormControl 
                          style={{
                            height: '126px',
                            width: '506px', 
                            borderRadius: '10px',
                            background: '#ececec',
                            color: 'black'
                          }} 
                          placeholder= "feel like cooking? leave your thoughts!"
                          onChange={e => handleStateChange(e, setReview)}
                      />
                      

                    {/* <FormControl
                      placeholder="feel like cooking? leave your thoughts!"
                    /> */}
                      
                    
                    </InputGroup>
                    <ButtonToolbar>
                      <ButtonGroup>
                        <Button variant='success' onClick={() => handleRatingChange(1, setRating)}>1</Button>
                        <Button variant='success' onClick={() => handleRatingChange(2, setRating)}>2</Button>
                        <Button variant='success' onClick={() => handleRatingChange(3, setRating)}>3</Button>
                        <Button variant='success' onClick={() => handleRatingChange(4, setRating)}>4</Button>
                        <Button variant='success' onClick={() => handleRatingChange(5, setRating)}>5</Button>
                        <div style={{marginLeft: '50px'}}>{`${rating} / 5`}</div>
                      </ButtonGroup>
                    </ButtonToolbar>
                    
                    {/* <div className="review">
                      <div className="review_text">
                      <div className="reviews">
                      feel like cooking? leave your thoughts?
                      </div>
                      <div className="rating">_/5 stars</div>
                      </div>
                    </div> */}
                  </Col>

                    <Button variant='outlined' id='leave_review' onClick={e => handleSubmit(e)}>
                      Leave a Review
                    </Button>
                  {/* <button type='button' onClick={() => console.log(review, rating)}>click</button> */}
                </Row>
        </div>
      );
}