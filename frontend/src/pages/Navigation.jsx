import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
    return (
        <div className="navigation">
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <div class="container">
                    <div>
                        <ul class="navbar-nav ml-auto">
                            <li
                                class={`nav-item  ${props.location.pathname === "/Register" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/Register">
                                    Register
                                </Link>
                            </li>
                            <li
                                class={`nav-item  ${props.location.pathname === "/Login" ? "active" : ""
                                    }`}
                            >
                                <Link class="nav-link" to="/Login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(Navigation);