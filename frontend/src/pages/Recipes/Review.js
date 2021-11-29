import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useAuth} from '../../config/Authentication';
// import { Button } from "@material-ui/core";
import { Container, Row, Col, Image, InputGroup, FormControl, ButtonToolbar, ButtonGroup, Button, Alert } from "react-bootstrap";

import "./Recipes.css";

export default function Reviews(){
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const {urlRecipeId}= useParams()
    let [userData, setUserData] = useState(null);
    const {currentUser} = useAuth()

    const handleStateChange = (e, setState) => {
        setState(e.target.value)      
    }

    const handleRatingChange = (value, setState) => {
      setState(value)
    }
  
    useEffect(() => {
      if(currentUser !== null){
      const user_id = currentUser.uid
      fetch(`http://localhost:5000/user/${user_id}`)
          .then((response) => response.json())
          // Setting recipe Data to the data that we received from the response above
          .then((data) => {
            console.log("RECIEVED API RESPONSE USER DATA: ", data);
            setUserData(data);

          });
        }
      }, []);

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.get(`http://localhost:5000/reviewupload/${urlRecipeId}/${userData.user[0].userName}/${review}/${rating}`)
      console.log(`http://localhost:5000/reviewupload/${urlRecipeId}/${userData.user[0].userName}/${review}/${rating}`)
      toast('successfully added comment for recipe!')
      setTimeout(() => {window.location.reload()}, 1000)
    }
    
    

    return (
        <div>
            <ToastContainer />
                <Row>
                  <Col xs lg="6">
                    <h2>Reviews and Remarks</h2>

                    <InputGroup>
                      <FormControl 
                          style={{
                            height: '206px',
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
                    <Button variant='outlined' id='leave_review' onClick={e => handleSubmit(e)}>
                      Leave a Review
                    </Button>                  
                  </Col>

                    
                </Row>
        </div>
      );
}