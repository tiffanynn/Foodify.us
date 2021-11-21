import React from "react";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";

import "./Recipes.css";

export default function RecipeHeader(props) {
    const [userData, setUserData] = useState([]);
    console.log(`http://localhost:5000/user/username/${props.headerData.userName}`)
    useEffect(() => {
        const userName = props.headerData.userName
        console.log(userName)
        fetch(`http://localhost:5000/user/username/${userName}`)
          .then((response) => response.json())
          // Setting recipe Data to the data that we received from the response above
          .then((data) => {
            console.log("RECIEVED API RESPONSE USER DATA: ", data);
            setUserData(data);
            console.log(data);
          });
      }, []);
    console.log(userData)
    const profilePic = userData.user[0].profileImgUrl

    return (
      <div>
          <Row>
              <Col lg={2}>
                    <Image
                        src= { profilePic }
                        width={100}
                        height={100}
                        roundedCircle
                    />
                <div>
                <Button variant="outlined" id="outlined">
                    Follow
                </Button>
                <br></br>
               {  userData.user[0].userName }
               </div>
              </Col>
        
          </Row>
     
      </div>
    );
  }