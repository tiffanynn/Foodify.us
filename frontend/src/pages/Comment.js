import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./Comment.css";

function Comment(props) {
    console.log(props);
    return (

        <div>
      <Container className="mt-5">

            <Row>
              <Col xs={12}>
                  
                  {/* <h2> Reviewed 4.8/5 stars </h2> */}

                  <div className = "box_2">
                    <Image src={props.reviewData.profileImgUrl} width={50} height= {50}
                             roundedCircle />

                    <Col>
                      <div className = "box_3">

                          <div className = "name">
                              {/* Llama . 45 mins ago */}
                              {props.reviewData.userName}  .  {props.reviewData.postDate}
                          </div>

                          <div className = "text">
                            {/* "quite a great recipe, I love it" */}
                            {props.reviewData.reviewBody}
                          </div>

                          <div>
                            {/* 4.8/5 */}
                            {props.reviewData.rating} / 5
                          </div>


                      </div>
                    </Col>

                  </div>
              </Col>
            </Row>
      </Container>{" "}
    </div>

    );
  }
  
  export default Comment;
