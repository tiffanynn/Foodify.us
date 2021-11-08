import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./Comment.css";

function Comment() {
    return (
        <Container className = "mt-5">
                <div className = "box">
                    Reviewed 4.8/5 stars
                </div>

                <div className = "box_2">
                    <div>
                        <Image src="https://64.media.tumblr.com/2f9e574d84ab082f1f16b96812d38c75/tumblr_oappq7XwlE1utr0aro8_250.png" width={35} height= {35}
                            roundedCircle />
                    </div>

                    <div className = "box_3">
                        <div className = "name">
                            Llama . 45 mins ago
                        </div>

                        <div class = "text">
                            “quite a great recipe, I found that half a bushel of spinach was much better”
                        </div>

                        <div>
                            4.5/5 stars
                        </div>
                    </div>

                </div>



        </Container>
    );
  }
  
  export default Comment;

//   <div className = "box">
//   <div className = "review">
//       Reviewed 4.8/5 stars
//   </div>
// </div>

// <div className = "box_2">
//   <div>
//       <Image src="https://64.media.tumblr.com/2f9e574d84ab082f1f16b96812d38c75/tumblr_oappq7XwlE1utr0aro8_250.png" width={35} height= {35}
//           roundedCircle />
//   </div>
  
//   <div className = "box_3">
//           <div class = "name">
//               Llama . 42 mins ago
//           </div>

//           <div class = "text">
//           “quite a great recipe, I found that half a bushel of spinach was much better”
//           </div>

//           <div class = "rating">
//               4.5/5 stars
//           </div>
//   </div>
// </div>