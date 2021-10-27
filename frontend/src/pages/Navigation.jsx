import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Navbar, Nav, Container } from 'react-bootstrap';



import SearchArea from './SearchArea'
import './Navigation.css';
import logo from '../Images/logo.png';

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

    

    let [NavbarContainerStyle, setNavbarContainerStyle] = useState({}); 
    let[showSearchBar, setShowSearchBar] = useState(false);
    let[showSearchText, setShowSearchText] = useState(false);
   
   


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

       
    }, []);
    
    return (
        // <div className="navigation">
        //     <AppBar color = "transparent">
        //         <Toolbar>
        //             <Grid container alignItems="center" justifyContent="center" direction="row" className="appbar-grid">
                        
        //                 <NavLink to="/"><div className="title"><img src={logo}></img>Foodify</div></NavLink>
                        
        //                 <Grid container item alignItems="center" justifyContent="flex-end">
        //                     {/* https://material-ui.com/guides/composition/#button */}
        //                     <Button id="login-btn" component={Link} to="/Login">Login</Button>
        //                     <Button id="signup-btn" component={Link} to="/Register">Register</Button>
        //                 </Grid>
        //             </Grid>
        //         </Toolbar>
        //     </AppBar>
        // </div>
        <div style = {NavbarContainerStyle}>
        <Navbar >
            <Container >
                    <Navbar.Brand className="mx-auto d-sm-flex d-block flex-sm-nowrap" href="/" ><div className="center">
                        <div className="title" ><img src={logo} height={35}></img>Foodify</div>
                    </div>
                            
                    </Navbar.Brand>
                
                <div className="justify-content-end">
                    <Button id="btn" component={Link} to="/Login">Login</Button>
                    <Button id="btn" component={Link} to="/Register">Register</Button>
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