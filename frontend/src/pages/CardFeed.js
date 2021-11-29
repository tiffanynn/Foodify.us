import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardFeedItem from "./CardFeedItem";
import { Container, Row, Col, Image, Card } from "react-bootstrap";


function CardFeed() {
  //Browser's Temporary Workspace Data (React State).
  //Anytime State Is Set, Render/Return Function Is Run Again
  let [recipeStateData, setRecipeStateData] = useState([]); // recipeStateData Initialized to Null

  //Fetches Recipe Data From API (After Component Is Rendered),
  //Saves Data to State using 'setRecipeStateData'
  useEffect(() => {
    fetch("http://localhost:5000/feed")
      .then((response) => response.json())
      // Setting recipe Data to the data that we received from the response above
      .then((data) => {
        console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
        setRecipeStateData(data);
      });
  }, []);

  return (
      
    <div>
      <h1>Trending Now</h1>
      <Row>
      <div className="cards">
        {console.log("STATE: ", recipeStateData)}

        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              {recipeStateData.length == 0 ? (
                <div>Loading</div>
              ) : (
                recipeStateData.recipes.map((recipe) => (
                  <CardFeedItem
                    src={recipe.imgUrl}
                    text={recipe.title}
                    username = {recipe.userName}
                    dietTags = {recipe.dietTagList}
                    label={recipe.hashTagList}
                    path={`/recipe/${recipe._id}`}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      </Row>
    </div>
  );
}

export default CardFeed;
