import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
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
      <h3>Trending Now</h3>
      <div className="cards">
        {console.log("STATE: ", recipeStateData)}

        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              {recipeStateData.length == 0 ? (
                <div>Loading</div>
              ) : (
                recipeStateData.recipes.map((recipe) => (
                  <CardItem
                    src={recipe.imgUrl}
                    text={recipe.title}
                    label={recipe.hashTag}
                    path={`/recipe/${recipe._id}`}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
