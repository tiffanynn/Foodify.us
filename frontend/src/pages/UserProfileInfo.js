import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";

import {useAuth} from '../config/Authentication'; 


import "./Profile.css";

function UserProfileInfo(props) {
    let [userData, setUserData] = useState(null);
    let [loggedInUserName, setLoggedInUserName] = useState(null);

    const {currentUser} = useAuth()
    
    useEffect(() => {
        const username = props.ProfileData.userName            
        fetchUserData();

        if(currentUser !== null){
            const user_id = currentUser.uid

            fetch(`http://localhost:5000/user/${user_id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.user[0].userName)
                setLoggedInUserName(data.user[0].userName)
          })
        }
      }, []);

    const fetchUserData = () => {
      const username = props.ProfileData.userName
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
            const user_id = currentUser.uid
          fetch(`http://localhost:5000/unfollow/${user_id}/${props.ProfileData.userName}`)
          .then(() => {setTimeout(() => {fetchUserData()}, 1000)});
        }
        else{
          // console.log("follow user request " + user_id)
          const user_id = currentUser.uid
          fetch(`http://localhost:5000/follow/${user_id}/${props.ProfileData.userName}`)
          .then(() => {setTimeout(() => {fetchUserData()}, 1000)});
        }
      }
    return (
      <div>
          {userData === null ? 
          <div></div>
          :
            <Container className="mt-5">
            <Row>
                <Col lg={2}>
                    <Image src={props.ProfileData.profileImgUrl} width={100} height= {100}
                    roundedCircle />
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
                                {userData.user[0].followerUserNameList.length} followers
                            </div>

                            <div class = "info" align = "right">
                                {props.ProfileData.recipeIdList.length} recipes
                            </div>

                        </Col>
                    </Row>
                </Col>
            </Row>
    
        </Container>
        }
      </div>
    );
  }
  
  export default UserProfileInfo;

//https://64.media.tumblr.com/2f9e574d84ab082f1f16b96812d38c75/tumblr_oappq7XwlE1utr0aro8_250.png