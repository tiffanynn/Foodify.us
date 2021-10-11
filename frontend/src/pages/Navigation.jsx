import React from "react";

import { Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

import { Navbar, Nav, Container } from 'react-bootstrap';

import './Navigation.css';
import logo from '../Images/logo.png';

function Navigation(props) {
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
        <Navbar>
            <Container>
                    <Navbar.Brand className="mx-auto d-sm-flex d-block flex-sm-nowrap" href="/" ><div className="center">
                        <div className="title"><img src={logo} height={35}></img>Foodify</div>
                    </div>
                            
                    </Navbar.Brand>
                
                <div className="justify-content-end">
                    <Button id="btn" component={Link} to="/Login">Login</Button>
                    <Button id="btn" component={Link} to="/Register">Register</Button>
                </div>
            </Container>
        </Navbar>
    );
}

export default withRouter(Navigation);