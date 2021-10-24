import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import Cards from "./Cards"

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { db } from "../firebase";

 export default function Profile() {
    const {logout, currentUser} = useAuth();
    const [data, setData] = useState(""); // retrieving firestore db info
    const history = useHistory();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function logoutSession(){
      setError("")
      try{
        await logout()
        history.push("/Login")

      }catch{
        setError("Can't Logout")
      }
      
    }
    // await usersCollection.get()
      return (
        <div>
          <Button onClick={logoutSession} style={{
            align:'right',
            alignItems: 'right'
          }}>
            Logout 
          </Button>
          
          {currentUser && currentUser.email}
          {/* {posts.map((item)=>)} */}
          
          <Cards />
          
        </div>
      );
  }
  
 