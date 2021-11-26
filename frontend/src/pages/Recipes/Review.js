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
      e.preventDefault()
      axios.get(`http://localhost:5000/reviewupload/${urlRecipeId}/mody1username/${review}/${rating}`)
      toast('successfully added comment for recipe!')
      setTimeout(() => {window.location.reload()}, 1000)
    }
    

    return (
        <div>
                <Row>
                  <Col xs lg="6">
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
                  
                  

                    <Button variant='outlined' id='leave_review' onClick={e => handleSubmit(e)}>
                      Leave a Review
                    </Button>
                    </Col>
                </Row>
        </div>
      );
}