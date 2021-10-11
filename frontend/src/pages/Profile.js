import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import Cards from "./Cards"

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';

 export default function Profile() {
    const {logout, currentUser} = useAuth();
    const history = useHistory();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e){
      await logout();
      try{
        setError("")
        setLoading(true)
        await logout()
        history.push("/Login")
      }catch{
        setError("Can't Logout")
      }
      
    }
      return (
        <div>
          <Button onClick={logout} style={{
            align:'right',
            alignItems: 'right'
          }}>
            Logout 
          </Button>
          
          {currentUser && currentUser.email}
          <Cards />
          
        </div>
      );
  }
  
 