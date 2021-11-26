import "./Recipes.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import RecipeInfo from "./RecipeInfo.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeHeader from "./RecipeHeader";
import Reviews from "./Review";
import Comment from "./../Comment.js";

import image from "../../Images/Rectangle 2.png";

export default function Recipe() {
  const { urlRecipeId } = useParams();
  let [recipeStateData, setRecipeStateData] = useState([]); // recipeStateData Initialized to Null
  let [reviewStateData, setReviewStateData] = useState([]);

  //Fetches Recipe Data From API (After Component Is Rendered),
  //Saves Data to State using 'setRecipeStateData'
  useEffect(() => {
    fetch(`http://localhost:5000/recipe/${urlRecipeId}`)
      .then((response) => response.json())
      // Setting recipe Data to the data that we received from the response above
      .then((data) => {
        console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
        setRecipeStateData(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/review/recipeid/${urlRecipeId}`)
      .then((response) => response.json())
      // Setting recipe Data to the data that we received from the response above
      .then((data) => {
        console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
        setReviewStateData(data);
      });
  }, []);


  return (
    <div id="recipe_page">
      <div>
          {recipeStateData.length == 0 ? (
          <div>Loading Recipe</div>
        ) : (
          <Container className="mt-5">
            <Row>
              <Col lg={2}>
                <RecipeHeader headerData={recipeStateData.recipe[0]} />
              </Col>
            <Col>
            <RecipeInfo recipeData={recipeStateData.recipe[0]} />
            <Row>
              <Reviews/>
              {reviewStateData.length == 0 ? (
                <div>Loading Review</div>
              ) : (
                reviewStateData.reviews.map(data => <Comment ReviewData={data} />)
              )}
            </Row>
          </Col></Row>
            
          <div className="d-flex justify-content-end">
            <img src={image} style={{ width: "auto", height: "600px" }}></img>
          </div>
         </Container>
          
        )}
        
    </div>   
    </div>
    
  );
}