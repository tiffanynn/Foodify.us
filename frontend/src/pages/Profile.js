import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import Cards from "./Cards"

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';

 export default function Profile() {
  const {logout, currentUser} = useAuth();
   const nameRef = useRef();
   const history = useHistory();
  async function handleSubmit(e){
    await logout();
    history.push("/login");
  }
    return (
      <div>
        <Cards />
        {/* <form>
          <label>
            Name:
            <input type="text" ref={nameRef} required />
          </label>
          
        </form> */}
        <Button onClick={logout}>
        Logout
        </Button>
        {/* {currentUser && currentUser.name} */}
        {currentUser && currentUser.email}
      </div>
    );
  }
  
 