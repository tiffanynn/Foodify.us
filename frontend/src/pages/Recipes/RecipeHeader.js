import React from "react";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";

import "./Recipes.css";

export default function RecipeHeader(props) {

    const { urlRecipeId } = useParams();
    let [userData, setUserData] = useState([]);
    useEffect(() => {
        const user_id = props.headerData.userName
        fetch(`http://localhost:5000/user/${user_id}`)
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
              <Col lg={2}>
                    <Image
                        src="https://64.media.tumblr.com/2f9e574d84ab082f1f16b96812d38c75/tumblr_oappq7XwlE1utr0aro8_250.png"
                        width={100}
                        height={100}
                        roundedCircle
                    />
                <br></br>
                <Button variant="outlined" id="outlined">
                    Follow
                </Button>
                <br></br>
               {  props.headerData.userName }
              </Col>
        
          </Row>
     
      </div>
    );
  }