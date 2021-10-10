import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";
import image from "../../Images/Rectangle 2.png";

import "./Recipes.css";

export default function RecipeInfo(props) {
  // API call saved as json file
  // make a component for list of ingredients
  // useEffect(() => {
  //     console.log(recipeData.Hashtag);
  //   });

  return (
      <div>
    <Container className="mt-5">
        <Row>
            <Col lg={2}>
                <Image src="https://64.media.tumblr.com/2f9e574d84ab082f1f16b96812d38c75/tumblr_oappq7XwlE1utr0aro8_250.png" width={100} height= {100}
                roundedCircle />
                <br></br>   
                <Button variant="outlined" id="outlined">Follow</Button><br></br>
                Franco Thomas
            </Col>
            <Col>
                <Row className="d-flex justify-content-between align-items-start">
                    <Col xs ={6} lg={6}>
                        <div className = "hashtag">#{props.recipeData.Hashtag}</div>
                        <h1>{props.recipeData.Title}</h1>
                        <div className = "time">{props.recipeData.Date} • { props.recipeData.EstimatedTime} preparation</div>
                    </Col>
                    <Col>
                    <div className= "text" align="right">Reviewed {props.recipeData.Rating} stars</div>
                    </Col>
                </Row>

                <Row>
                <Col>
                <div className = "post_pic"><img src={props.recipeData.ImageURL} width="550" height="400"></img></div>
            </Col>
            <Col>
                <Row>
                    <Col>
                    <div className ="ingredients"> <div className= "text"> {props.recipeData.IngredientsList.map((ingredient) => (
                    <p>{ingredient}</p>
                    ))}
                    </div></div>
                    </Col><Col>
                    <div className ="description"> {props.recipeData.DietTags.map((
                        tag) => (
                    <p> <Button variant="outlined" id="outlined" className="tag">{tag}</Button></p>
                    ))}
                    </div>
                    </Col></Row>
                <Row></Row>
                <div className ="description"> <div className= "text"> {props.recipeData.Story}</div></div></Col>
                </Row>

            <div className="mt-3">
                <Button variant="outlined" id="leave_review" className="mx-3">Leave a Review</Button> 
                <Button variant="text" id="save">Save</Button>
            </div>
            <Row>
                <Col xs={6}><h2>Reviews and Remarks</h2>
                    hello world
                    <div className = "review">
                        <div className = "review_text">
                            <div className="reviews">feel like cooking? leave your thoughts?</div>
                            <div className="rating">_/5 stars</div>
                        </div>
                    </div>
                </Col>
            </Row>
            </Col>
        </Row>
   
    </Container> <div className="d-flex justify-content-end"><img src={image} style={{width: "auto", height: "600px"}}></img></div></div>
  );
}
