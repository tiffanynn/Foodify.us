import "./Recipes/Recipes.css";
import React from "react";
import RecipeInfo from "./Recipes/RecipeInfo.js";
import CardItem from "./CardItem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

const searchValueTextDivStyle = {
  paddingTop: "10px",
};
export default function ProfileSearchResults() {
  const { urlSearchValue } = useParams();
  let decodedUrlSearchValue = decodeURIComponent(urlSearchValue);
  let [userStateData, setUserStateData] = useState([]); // userStateData Initialized to Null

  //Fetches Recipe Data From API (ON RENDER AND WHEN URL CHANGES)
  //Saves Data to State using 'userStateData'
  useEffect(() => {
    fetch(`http://localhost:5000/searchuser/${urlSearchValue}`)
      .then((response) => response.json())
      // Setting recipe Data to the data that we received from the response above
      .then((data) => {
        console.log("RECIEVED SEARCH API RESPONSE RECIPE DATA: ", data);
        setUserStateData(data);
      });
  }, [urlSearchValue]);

  return (
    <div>
      <div style={searchValueTextDivStyle}>
        <p>{`Results for: ${decodedUrlSearchValue}`}</p>
      </div>

      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {userStateData.length == 0 ? (
              <div>Loading</div>
            ) : (
              userStateData.users.map((user) => (
                <CardItem
                  src={user.profileImgUrl}
                  text={user.userName}
                  label={user.name}
                  path={`/user/username/${user.userName}`}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
