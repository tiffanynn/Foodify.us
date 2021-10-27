import React, {useState, useRef} from "react";

import { Button } from "@material-ui/core";
import { Link, withRouter, useHistory } from "react-router-dom";

import { Navbar, Nav, Container } from 'react-bootstrap';

import { useAuth } from "../config/Authentication.js";
import './Navigation.css';
import logo from '../Images/logo.png';

function Navigation(props) {
    const isLoggedIn = true;
    const { logout, currentUser, login, signup } = useAuth();
    const history = useHistory();
    const [error, setError] = useState("");

    async function logoutSession(){
        setError("")
        try {
            await logout()
            history.push("/Login")
        } catch {
            setError("Can't Logout")
        }
    }
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
                    {isLoggedIn && <Button id="btn" component={Link} to="/Login">Login</Button>}
                    {isLoggedIn && <Button id="btn" component={Link} to="/Register">Register</Button>}
                    {isLoggedIn && <Button id="btn" onClick={logoutSession}>Logout</Button>}
                </div>
            </Container>
        </Navbar>
    );
}

export default withRouter(Navigation);