import React from "react";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import {useAuth} from '../../config/Authentication';


import "./Recipes.css";

export default function RecipeHeader(props) {
    let [userData, setUserData] = useState(null);
    let [loggedInUserName, setLoggedInUserName] = useState(null);

    const {currentUser} = useAuth()
    const user_id = currentUser.uid

    useEffect(() => {
        const username = props.headerData.userName
        fetchUserData();
        fetch(`http://localhost:5000/user/${user_id}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.user[0].userName)
            setLoggedInUserName(data.user[0].userName)
          })
      }, []);

    const fetchUserData = () => {
      const username = props.headerData.userName
        fetch(`http://localhost:5000/user/username/${username}`)
          .then((response) => response.json())
          // Setting recipe Data to the data that we received from the response above
          .then((data) => {
            console.log("RECIEVED API RESPONSE USER DATA: ", data);
            setUserData(data);
          });
    }
    
    const onClickHandler = () => {
      if(userData.user[0].followerUserNameList.includes(loggedInUserName)){
        fetch(`http://localhost:5000/unfollow/${user_id}/${props.headerData.userName}`)
        .then(() => fetchUserData());
      }
      else{
        console.log("follow user request " + user_id)
        fetch(`http://localhost:5000/follow/${user_id}/${props.headerData.userName}`)
        .then(() => fetchUserData());
      }
    }

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
                {
                  loggedInUserName === null ?
                  <div></div>
                  :
                  <div>
                    {userData.user[0].followerUserNameList.includes(loggedInUserName) ? 
                    <Button variant="outlined" id="outlined" onClick={onClickHandler}>
                      Unfollow
                    </Button> 
                    :
                    <Button variant="outlined" id="outlined" onClick={onClickHandler}>
                      Follow
                    </Button> 
                    }
                  </div>
                }
                <br></br>
               {  props.headerData.userName }
               </div>
              </Col>
        
          </Row>
     
      </div>
    );
  }