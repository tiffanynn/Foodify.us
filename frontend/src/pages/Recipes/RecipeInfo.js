import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";
import image from "../../Images/Rectangle 2.png";

import "./Recipes.css";

export default function RecipeInfo(props) {
  
  return (
    <div>
            <Row className="d-flex justify-content-between align-items-start">
              <Col xs={6} lg={6}>
                <div className="hashtag">
                  <span>
                    {props.recipeData[0].hashTagList.map((hashtag) => (
                      <a>{hashtag} </a>
                    ))}
                  </span>
                </div>
                <h1>{props.recipeData[0].title}</h1>
                <div className="time">
                  {props.recipeData[0].postDate} • {props.recipeData[0].estimatedTime}{" "}
                  preparation
                </div>
              </Col>
              <Col>
                <div className="text" align="right">
                  {/* Reviewed 10 stars */}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="post_pic">
                  <img
                    src={props.recipeData[0].imgUrl}
                    width="550"
                    max-height="400"
                  ></img>
                </div>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <div className="ingredients">
                      {" "}
                      <div className="text">
                        {" "}
                        {props.recipeData[0].ingredientList.map((ingredient) => (
                          <p>{ingredient}</p>
                        ))}
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="description">
                      {" "}
                      {props.recipeData[0].dietTagList.map((tag) => (
                        <p>
                          {" "}
                          <Button
                            variant="outlined"
                            id="outlined"
                            className="tag"
                          >
                            {tag}
                          </Button>
                        </p>
                      ))}
                    </div>
                  </Col>
                </Row>
                <Row></Row>
                <div className="description">
                  {" "}
                  <div className="text"> {props.recipeData[0].story}</div>
                </div>
              </Col>
            </Row>
    {" "}
    </div>
  );
}