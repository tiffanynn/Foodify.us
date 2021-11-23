import React from "react";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";

import "./Recipes.css";

export default function RecipeHeader(props) {

    let [userData, setUserData] = useState(null);

    useEffect(() => {
        const user_id = props.headerData.userName
        fetch(`http://localhost:5000/user/username/${user_id}`)
          .then((response) => response.json())
          // Setting recipe Data to the data that we received from the response above
          .then((data) => {
            console.log("RECIEVED API RESPONSE USER DATA: ", data);
            setUserData(data);
          });
      }, []);
    
    return (
      <div>
          <Row>
              <Col className="d-flex flex-column justify-content-center">
                  <div>
                {
                    userData != null &&
                    <Image
                        src={userData.user[0].profileImgUrl}
                        width={100}
                        height={100}
                        roundedCircle
                    />
                }
                <br></br>
                <Button variant="outlined" id="outlined">
                    Follow
                </Button>
                <br></br>
               {  props.headerData.userName }
               </div>
              </Col>
        
          </Row>
     
      </div>
    );
  }