import Button from "@restart/ui/esm/Button";
import React from "react";
import Cards from "./Cards"

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";

 export default function Profile() {
  const {logout, currentUser} = useAuth();
   const history = useHistory();
  async function handleSubmit(e){
    await logout();
    history.push("/login");
  }
    return (
      <div>
        <Cards />
        <Button onClick={logout}>
        Logout
        </Button>
        {currentUser && currentUser.email}
      </div>
    );
  }
  
 