import React from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

import './Navigation.css';
import logo from '../Images/logo.png';

function Navigation(props) {
    return (
        <div className="navigation">
            <AppBar color = "transparent">
                <Toolbar>
                    <Grid container alignItems="center" justifyContent="center" direction="row" className="appbar-grid">
                        
                        <div className="title"><img src={logo}></img>Foodify</div>
                        
                        <Grid container item alignItems="center" justifyContent="flex-end">
                            {/* https://material-ui.com/guides/composition/#button */}
                            <Button id="login-btn" component={Link} to="/Login">Login</Button>
                            <Button id="signup-btn" component={Link} to="/Register">Register</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* <nav class="navbar navbar-expand navbar-dark bg-dark">
                <div class="container">
                    <div>
                        <ul class="navbar-nav ml-auto">
                            <li class={`nav-item  ${props.location.pathname === "/Register" ? "active" : ""}`}>
                                <Link class="nav-link" to="/Register">Register</Link>
                            </li>
                            <li class={`nav-item  ${props.location.pathname === "/Login" ? "active" : ""}`}>
                                <Link class="nav-link" to="/Login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
        </div>
    );
}

export default withRouter(Navigation);