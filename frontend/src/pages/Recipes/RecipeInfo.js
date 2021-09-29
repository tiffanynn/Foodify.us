import React, { useEffect } from "react";
import { Grid, Button } from "@material-ui/core";

export default function RecipeInfo(props) {
  /*const recipeData = {
    ID: "1234",
    Hashtag: "francofoodtips",
    Title: "Why is it so hard to make cereal ?",
    Date: "2021-05-18",
    EstimatedTime: "20",
    IngredientsList: [
      "2 cups Cereal Grain",
      "1 pint of oat milk",
      "ground wild almond",
      "flax seeds",
    ],
    DietTags: ["pescatarian", "paleo"],
    Story:
      "Your eyes crack open, the room is bright. It’s 10 Am, and you’ve slept through all 3 of your alarms. Karen, your mother-in-law will be coming for brunch in just half an hour. You’re feeling anxious, but you have just the right recipe. Cereal. Gently lower your grain of choice into a round bowl. Lather top with fresh milk. Finish with toppings. Serve cold.",
    ImageURL:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/feaa97ad73e74183b4af84e2fafd8c68.png",
  };*/

  // API call saved as json file
  // make a component for list of ingredients
  // useEffect(() => {
  //     console.log(recipeData.Hashtag);
  //   });

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item direction="column" md={3}>
        <div>Profile Pic</div>
        <div>
          <Button class="MuiButton-root MuiButton-outlined">Follow</Button>
        </div>
        <div>User's name</div>
      </Grid>
      <Grid item container direction="column" md={8}>
        <Grid item container direction="row" justifyContent="space-between">
          <Grid item direction="column">
            <div>Hashtag</div>
            <div>{props.recipeData.Title}</div>
            <div>Date and preparation time</div>
          </Grid>
          <Grid item>
            <div>Number of stars review</div>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item>
            <div>Picture</div>
          </Grid>
          <Grid item container direction="column">
            <Grid item container direction="row">
              <Grid item>
                <div>List of ingredients:</div>
                {props.recipeData.IngredientsList.map((ingredient) => (
                  <p>{ingredient}</p>
                ))}
              </Grid>
              <Grid item>
                <div>Tags (pescatarian, paleo)</div>
              </Grid>
            </Grid>
            <Grid item>
              <div>Instructions</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
