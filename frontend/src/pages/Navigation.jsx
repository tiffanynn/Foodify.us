import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button } from "@material-ui/core";
import { Link, withRouter, NavLink } from "react-router-dom";

import './Navigation.css';
import logo from '../Images/logo.png';

function Navigation(props) {
    return (
        <div className="navigation">
            <AppBar color = "transparent">
                <Toolbar>
                    <Grid container alignItems="center" justifyContent="center" direction="row" className="appbar-grid">
                        
                        <NavLink to="/"><div className="title"><img src={logo}></img>Foodify</div></NavLink>
                        
                        <Grid container item alignItems="center" justifyContent="flex-end">
                            {/* https://material-ui.com/guides/composition/#button */}
                            <Button id="login-btn" component={Link} to="/Login">Login</Button>
                            <Button id="signup-btn" component={Link} to="/Register">Register</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Navigation);