import React, { useEffect } from "react";
import { Grid, Button, Avatar } from "@material-ui/core";
import "./Recipes.css";

export default function RecipeInfo(props) {
  // API call saved as json file
  // make a component for list of ingredients
  // useEffect(() => {
  //     console.log(recipeData.Hashtag);
  //   });

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item direction="column"
      justifyContent="center">
          <Avatar src="https://64.media.tumblr.com/2f9e574d84ab082f1f16b96812d38c75/tumblr_oappq7XwlE1utr0aro8_250.png"
        sx={{ width: 90, height: 90 }} /><br></br>   
        <Button variant="outlined">Follow</Button><br></br>
        User's name
          
      </Grid>
      <Grid item container direction="column" md={8}>
        <Grid item container direction="row" justifyContent="space-between">
          <Grid item direction="column">
            <div>Hashtag: {props.recipeData.Hashtag}</div>
            <h1>{props.recipeData.Title}</h1>
            <div>Date and preparation time: {props.recipeData.Date}</div>
          </Grid>
          <Grid item>
            <div class= "text">Reviewed {props.recipeData.Rating} stars</div>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item>
            <div class = "post_pic"><img src={props.recipeData.ImageURL} width="550" height="400"></img></div>
          </Grid>
          <Grid item container direction="column">
            <Grid item container direction="row">
              <Grid item>
                <div class= "text"> {props.recipeData.IngredientsList.map((ingredient) => (
                  <p>{ingredient}</p>
                ))}</div>
               
              </Grid>
              <Grid item>
                <div>Tags (pescatarian, paleo)</div>
              </Grid>
            </Grid>
            <Grid item>
              <div class = "text">Instructions<br></br>{props.recipeData.Story}</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
