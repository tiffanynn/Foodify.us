import React from "react";
import UserProfileInfo from "./UserProfileInfo";
import RecipeInfo from "./Recipes/RecipeInfo";
import Comment from "./Comment";
import { Container, Row, Col, Image } from "react-bootstrap";

import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

function UserProfile() {
  const { userName } = useParams();
  console.log(userName)
  let [recipeStateData, setRecipeStateData] = useState([]); // recipeStateData Initialized to Null
  let [profileStateData, setProfileStateData] = useState([]);
  let [reviewStateData, setReviewStateData] = useState([]);
  const [recipeAndReviewData, setRecipeAndReviewData] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const apiCall = async(ind) => {
    const [recipeData, reviewData] = await Promise.all([
      axios.get(`http://localhost:5000/recipe/${recipes[ind]}`),
      axios.get(`http://localhost:5000/review/recipeid/${recipes[ind]}`)
    ])
    return [recipeData, reviewData];
    // setRecipeStateData(recipeData.data);
    // setReviewStateData(reviewData.data);
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/user/username/${userName}`)
    .then(response => {
      setProfileStateData(response.data);      
      setRecipes(response.data.user[0].recipeIdList)
    })
  },[])

  useEffect(() => {   
    const getAllRecipeReview = async() => {
      if (recipes.length > 0){
        const formattedData = await Promise.all(recipes.map(async(recipe, ind) => {
  
          const data = await apiCall(ind)
          
          const returnObj = {
            recipe: data[0].data.recipe,
            reviews: data[1].data.reviews 
          }
          return returnObj;
        }))
        
        setRecipeAndReviewData(formattedData)
      }
    }

    getAllRecipeReview()
  }, [recipes])

  useEffect(() => {
    console.log('recipe and review data');
    console.log(recipeAndReviewData)
  }, [recipeAndReviewData])

    return (
      <Container className="mt-5">
        <Row>
          {profileStateData.length == 0 ? (
              <div>Loading Profile</div>
            ) : (
              <UserProfileInfo ProfileData={profileStateData.user[0]} />                            
            )}
        </Row>

        {recipeAndReviewData.map(obj => (
          <Row>
            <Col lg={2}></Col>
            <Col>
              <RecipeInfo recipeData={obj.recipe}/>
              {obj.reviews.map(review => (<Comment reviewData={review} />))}
            </Col>
          </Row>
        ))}
        {/* <Row>
          <Col lg={2}></Col>
          <Col>
            {recipeStateData.length == 0 ? (
              <div>Loading Recipe</div>
            ) : (
              // <RecipeInfo recipeData={recipeStateData.recipe[0]} />            
              <div>hello</div>
            )}
            <h2> Comments </h2>

            {reviewStateData.length == 0 ? (
              <div>Loading Review</div>
            ) : (
              // reviewStateData.reviews.map(data => <Comment ReviewData={data} />)              
              <div>hello</div>
            )}
          </Col>
        </Row> */}
        
      </Container>
    );
  }
  
  export default UserProfile;
