import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardFeedItem from "./CardFeedItem";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//import { browserHistory } from "react-router";
import { Link } from "react-router-dom";
//import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
//import ArrowCircleRightRoundedIcon from "@material-ui/icons/ArrowCircleRightRounded";

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
      <Row>
        <div className="cards">
          {console.log("STATE: ", recipeStateData)}

          <div className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items">
                {recipeStateData.length == 0 ? (
                  <div>Loading</div>
                ) : (
                  <div>
                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      style={{
                        marginTop: "10px",
                        marginBottom: "40px",
                      }}
                    >
                      <Grid item xs={9}>
                        <h1>Trending Now</h1>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      spacing={1}
                    >
                      {recipeStateData.trending.map((recipe) => (
                        <Grid item xs={4}>
                          <CardFeedItem
                            src={recipe.imgUrl}
                            text={recipe.title}
                            username={recipe.userName}
                            dietTags={recipe.dietTagList}
                            label={recipe.hashTagList}
                            path={`/recipe/${recipe._id}`}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      style={{
                        marginTop: "60px",
                        marginBottom: "30px",
                      }}
                    >
                      <Grid item xs={9}>
                        <h1>Popular with Vegetarians</h1>
                      </Grid>
                      <Grid item xs={3}>
                        <Link
                          className="btn btn-green"
                          role="button"
                          to="/search/query=&dietTags=vegetarian"
                        >
                          <Button
                            style={{
                              textTransform: "lowercase",
                              border: "2px solid #19B47C",
                            }}
                          >
                            more vegetarian recipes
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      spacing={1}
                    >
                      {recipeStateData.vegetarian.map((recipe) => (
                        <Grid item xs={4}>
                          <CardFeedItem
                            src={recipe.imgUrl}
                            text={recipe.title}
                            username={recipe.userName}
                            dietTags={recipe.dietTagList}
                            label={recipe.hashTagList}
                            path={`/recipe/${recipe._id}`}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      style={{
                        marginTop: "60px",
                        marginBottom: "30px",
                      }}
                    >
                      <Grid item xs={9}>
                        <h1>Paleo Lifestyle</h1>
                      </Grid>
                      <Grid item xs={3}>
                        <Link
                          className="btn btn-green"
                          role="button"
                          to="/search/query=&dietTags=paleo"
                        >
                          <Button
                            style={{
                              textTransform: "lowercase",
                              border: "2px solid #19B47C",
                            }}
                          >
                            more paleo recipes
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      spacing={1}
                    >
                      {recipeStateData.paleo.map((recipe) => (
                        <Grid item xs={4}>
                          <CardFeedItem
                            src={recipe.imgUrl}
                            text={recipe.title}
                            username={recipe.userName}
                            dietTags={recipe.dietTagList}
                            label={recipe.hashTagList}
                            path={`/recipe/${recipe._id}`}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      style={{
                        marginTop: "60px",
                        marginBottom: "30px",
                      }}
                    >
                      <Grid item xs={9}>
                        <h1>Pescatarian Waves 🐟 </h1>
                      </Grid>
                      <Grid item xs={3}>
                        <Link
                          className="btn btn-green"
                          role="button"
                          to="/search/query=&dietTags=pescatarian"
                        >
                          <Button
                            style={{
                              textTransform: "lowercase",
                              border: "2px solid #19B47C",
                            }}
                          >
                            more pescatarian recipes
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      spacing={1}
                    >
                      {recipeStateData.pescatarian.map((recipe) => (
                        <Grid item xs={4}>
                          <CardFeedItem
                            src={recipe.imgUrl}
                            text={recipe.title}
                            username={recipe.userName}
                            dietTags={recipe.dietTagList}
                            label={recipe.hashTagList}
                            path={`/recipe/${recipe._id}`}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      style={{
                        marginTop: "60px",
                        marginBottom: "30px",
                      }}
                    >
                      <Grid item xs={9}>
                        <h1>Keto Friendly </h1>
                      </Grid>
                      <Grid item xs={3}>
                        <Link
                          className="btn btn-green"
                          role="button"
                          to="/search/query=&dietTags=keto%20friendly"
                        >
                          <Button
                            style={{
                              textTransform: "lowercase",
                              border: "2px solid #19B47C",
                            }}
                          >
                            more keto recipes
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      spacing={1}
                    >
                      {recipeStateData.keto.map((recipe) => (
                        <Grid item xs={4}>
                          <CardFeedItem
                            src={recipe.imgUrl}
                            text={recipe.title}
                            username={recipe.userName}
                            dietTags={recipe.dietTagList}
                            label={recipe.hashTagList}
                            path={`/recipe/${recipe._id}`}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      style={{
                        marginTop: "60px",
                        marginBottom: "30px",
                      }}
                    >
                      <Grid item xs={9}>
                        <h1>Vegan & Easy </h1>
                      </Grid>
                      <Grid item xs={3}>
                        <Link
                          className="btn btn-green"
                          role="button"
                          to="/search/query=&dietTags=vegan"
                        >
                          <Button
                            style={{
                              textTransform: "lowercase",
                              border: "2px solid #19B47C",
                            }}
                          >
                            more vegan recipes
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      spacing={1}
                    >
                      {recipeStateData.vegan.map((recipe) => (
                        <Grid item xs={4}>
                          <CardFeedItem
                            src={recipe.imgUrl}
                            text={recipe.title}
                            username={recipe.userName}
                            dietTags={recipe.dietTagList}
                            label={recipe.hashTagList}
                            path={`/recipe/${recipe._id}`}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      style={{
                        marginTop: "60px",
                        marginBottom: "30px",
                      }}
                    >
                      <Grid item xs={9}>
                        <h1>Calorie Conscious Eats </h1>
                      </Grid>
                      <Grid item xs={3}>
                        <Link
                          className="btn btn-green"
                          role="button"
                          to="/search/query=&dietTags=calorie%20lite"
                        >
                          <Button
                            style={{
                              textTransform: "lowercase",
                              border: "2px solid #19B47C",
                            }}
                          >
                            more calorie lite recipes
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                      spacing={1}
                    >
                      {recipeStateData.calorielite.map((recipe) => (
                        <Grid item xs={4}>
                          <CardFeedItem
                            src={recipe.imgUrl}
                            text={recipe.title}
                            username={recipe.userName}
                            dietTags={recipe.dietTagList}
                            label={recipe.hashTagList}
                            path={`/recipe/${recipe._id}`}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
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
