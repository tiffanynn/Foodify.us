
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@material-ui/core";
import { Link, withRouter, useHistory } from "react-router-dom";

import { useAuth } from "../config/Authentication.js";

import Grid from "@material-ui/core/Grid";
import { Navbar, Nav, Container, Dropdown, Image } from 'react-bootstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';


import SearchArea from './SearchArea'
import './Navigation.css';
import logo from '../Images/logo.png';
import userIcon from '../Images/user-icon.jpg';

const noSpacingStyle = {
    padding: "4px",
    margin: "4px",
  };
  const noSpacingStyleAndLarge = {
    padding: "5px",
    marginBottom: "10px",
    fontSize: "120%",
  };



function Navigation(props) {
    const { logout, currentUser} = useAuth();
    const history = useHistory();
    const [error, setError] = useState("");

    // Display Logout only if User is logged in 
    let [showEntry, setshowEntry] = useState(false);
    useEffect(()=>{
        console.log("hi")
        if(currentUser){
            setshowEntry(true);
            // if(userData === null){
            //     getProfilePic()
            // }
            
        } else{
            setshowEntry(false);
        }
    })
    
    async function getProfilePic(){
        if(showEntry){
            const user_id = currentUser
            fetch(`http://localhost:5000/user/${user_id.uid}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("RECIEVED API RESPONSE USER DATA: ", data);
                setUserData(data);
            });}
    }

    // Logging out user from Profile
    async function logoutSession(){
        setError("")
        try {
            await logout()
            history.push("/Login")
        } catch {
            setError("Can't Logout")
        }
    }
    // Drop Down Menu Attempt
    let [Active, setActive] = useState(false);
    const toggleActive = () => setActive(!Active);
    

    let [NavbarContainerStyle, setNavbarContainerStyle] = useState({}); 
    let[showSearchBar, setShowSearchBar] = useState(false);
    let[showSearchText, setShowSearchText] = useState(false);
   
    let [userData, setUserData] = useState(null);


    const noSpacingStyle = {
        padding: "0px",
        margin: "4px",
      };
      const noSpacingStyleAndLarge = {
        padding: "0px",
        marginBottom: "0px",
        fontSize: "120%",
      };
    //IF ON HOME SCREEN PAGE LOCALHOST:3000/ CHANGE STYLE BACKGROUND TO LIGHT GREEN TO MATCH SEARCHBOX
    useEffect(() => {
        if(currentUser !== null){
        const user_id = currentUser
        fetch(`http://localhost:5000/user/${user_id.uid}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("RECIEVED API RESPONSE USER DATA: ", data);
            setUserData(data);
        });}
         if(window.location.pathname == "/" ){
             setNavbarContainerStyle( { backgroundColor: "#c7f4e2",}); 
             setShowSearchBar(true);
             setShowSearchText(true);
         } else if(window.location.pathname.includes("/search/")){
             setNavbarContainerStyle( { backgroundColor: "#c7f4e2", }); 
             setShowSearchBar(true);
             setShowSearchText(false);
         } else {
             setNavbarContainerStyle({ backgroundColor: "white"});
             setShowSearchBar(false);
             setShowSearchText(false);
         }
     }, [currentUser]);
    
    return (
        <div style = {NavbarContainerStyle}>
        <Navbar >
            <Container >
                    <Navbar.Brand className="mx-auto d-sm-flex d-block flex-sm-nowrap" href="/" 
                        style={{
                            // position: "absolute",
                            // flexDirection:"row"
                            justifyContent: "end",
                            marginLeft: "-200px"
                        }}
                    >
                    <div className="center">
                        <div className="title" ><img src={logo} height={35}></img>Foodify</div>
                    </div>
                            
                    </Navbar.Brand>
                
                <div className="justify-content-end">
                        {!showEntry && <Button id="btn" component={Link} to="/Login">Login</Button>}
                        {!showEntry && <Button id="btn" component={Link} to="/Register">Register</Button>}
                        {showEntry && 
                        <Dropdown>
                            <Container 
                                style={{
                                    justifyContent:"end",
                                    marginLeft: "-200px"
                                }}>
                                    <Dropdown.Toggle
                                        style={{
                                            outline: "none",
                                            width: "59.5px",
                                            height: "60px",
                                            position: "fixed",
                                            background: "transparent",
                                            color:"transparent", //for the triangle
                                            display: "block",
                                            borderColor: "#c7f4e2",
                                            borderWidth: "0px",
                                            borderRadius: "400px"
                                        }}
                                    ></Dropdown.Toggle>
                                {
                                    userData != null &&
                                    <Image
                                        src={userData.user[0].profileImgUrl}
                                        width={60}
                                        height={60}
                                        roundedCircle
                                    />
                                }
                                </Container>
                            <Dropdown.Menu style={{
                                justifyContent: "end",
                                marginLeft: "-200px",
                                width: "fit-content"
                            }}>
                                    <Dropdown.Item id="btn" href="/Profile" style={{ background: "transparent" }}>Profile</Dropdown.Item>
                                    <Dropdown.Item id="btn" href="/upload" style={{ background: "transparent" }}>Upload </Dropdown.Item>
                                    <Dropdown.Item id="btn" href="/Edit-Profile" style={{ background: "transparent" }}>Setting</Dropdown.Item>
                                    <Dropdown.Item id="btn" onClick={logoutSession} style={{ background: "transparent" }}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                        
                </div>

            </Container>
           
            
        </Navbar>
        <Grid justifyContent="center" >   
            {showSearchText &&<p style={noSpacingStyle}>Reviewed and rated. Tailored to your diet.</p>}
            {showSearchText &&<p style={noSpacingStyleAndLarge}> All in one place</p>}
            {showSearchBar && <SearchArea />}
         </Grid>
        
        </div>
    );
}

export default withRouter(Navigation);