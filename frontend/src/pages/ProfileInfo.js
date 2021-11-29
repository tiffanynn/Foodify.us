import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./Profile.css";

function ProfileInfo(props) {
    return (
      <div>
        <Container className="mt-5">
        <Row>
            <Col lg={2}>
                <Image src={props.ProfileData.profileImgUrl} width={100} height= {100}
                roundedCircle />
                <br></br>
                {props.ProfileData.userName}
            </Col>
            <Col>
                <Row className="d-flex justify-content-between align-items-start">
                    <Col xs ={6} lg={6}>
                        <div class = "username">
                            {props.ProfileData.userName}
                        </div>

                        <div class = "bio">
                            {props.ProfileData.bio}
                        </div>
                    </Col>
                    <Col>
                        <div class = "info" align = "right">
                            {props.ProfileData.followerUserNameList.length} followers
                        </div>

                        <div class = "info" align = "right">
                            {props.ProfileData.recipeIdList.length} recipes
                        </div>

                    </Col>
                </Row>
            </Col>
        </Row>
   
    </Container>
      </div>
    );
  }
  
  export default ProfileInfo;

//https://64.media.tumblr.com/2f9e574d84ab082f1f16b96812d38c75/tumblr_oappq7XwlE1utr0aro8_250.png