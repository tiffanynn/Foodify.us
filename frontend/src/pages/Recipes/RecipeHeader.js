import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./Recipes.css";

export default function RecipeHeader(props) {
    // props.recipeData.recipe
    // const { urlRecipeId } = useParams();
    // let [userData, setUserData] = useState([]);
    // useEffect(() => {
    //     fetch(`http://localhost:5000/recipe/${urlRecipeId}`)
    //       .then((response) => response.json())
    //       // Setting recipe Data to the data that we received from the response above
    //       .then((data) => {
    //         console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
    //         setUserData(data);
    //       });
    //   }, []);

    // user_id = props.recipeData.userName
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
                Franco Thomas
              </Col>
        
          </Row>
     
      </div>
    );
  }