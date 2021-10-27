import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import Cards from "./Cards"

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { db, usersCollection } from "../firebase";

 export default function Profile() {
    const {currentUser} = useAuth();
    const [dbData, setdbData] = useState([]); // retrieving firestore db info
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const isLogginActive = useRef()

  // Displays Current user's information in console.log (WORKS)
   if (isLogginActive) {
      usersCollection.doc(currentUser.uid).get()
        .then((doc) => {
          if (doc.exists) {
            console.log("DATA: ", doc.data())
          }
          else {
            console.log("ERROR")
          }
        }).catch(e => {
          console.log("ERROR GETTING DOC", e)
        })
    }
   
      return (
        <div>
          {dbData && dbData.map(currentUser=>{
            <p>{currentUser.name}</p>
          })}
          <p>{currentUser && currentUser.email}</p>
         {/*{dbData.map(data => ('Name: ' + data.name + '\nEmail: ' + data.email))} */}
          {/* {data.length > 0 ? (
            data.map((data) => <div key={data.key}>{data.answer}</div>)
          ) : (
            <h1>no answers yet :(</h1>
          )} */}
          {/* {posts.map((item)=>)} */}
          
          <Cards />
          
        </div>
      );
  }
  
 