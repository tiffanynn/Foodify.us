import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./Recipes.css";

export default function RecipeHeader(props) {
  
    return (
      <Container className="mt-5">
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
              <Col>
                    <Row className="d-flex justify-content-between align-items-start">
                    <Col xs={6} lg={6}>
  
                    </Col>
                        <Col>
                            <div className="text" align="right">
                            Reviewed 10 stars
                            </div>
                        </Col>
                    </Row>
              </Col>
        
          </Row>
     
      </Container>
    );
  }