import React from "react";
import ProfileInfo from "./ProfileInfo";
import RecipeInfo from "./Recipes/RecipeInfo";
import Comment from "./Comment";

function Profile() {

  const ProfileData = {

    username : "eats_by_franco",
    bio : "Cook the change you want to see in the world - Gandhi",
    recipes: "49",
    followers: "241",

  };

  const recipeData = {
    ID: "1234",
    Hashtag: "francofoodtips",
    Title: "Why is it so hard to make cereal ?",
    Date: "2021-05-18",
    Rating: "4.2/5",
    EstimatedTime: "20 minutes",
    IngredientsList: [
      "2 cups Cereal Grain",
      "1 pint of oat milk",
      "ground wild almond",
      "flax seeds",
    ],
    DietTags: ["pescatarian", "paleo"],
    Story:
      "Your eyes crack open, the room is bright. It’s 10 Am, and you’ve slept through all 3 of your alarms. Karen, your mother-in-law will be coming for brunch in just half an hour. You’re feeling anxious, but you have just the right recipe. Cereal. Gently lower your grain of choice into a round bowl. Lather top with fresh milk. Finish with toppings. Serve cold.",
    ImageURL:
      "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/feaa97ad73e74183b4af84e2fafd8c68.png",
  };

    return (
      <div>
        <ProfileInfo ProfileData={ProfileData} />
        {/* <RecipeInfo recipeData={recipeData} /> */}
        <Comment/>
      </div>
    );
  }
  
  export default Profile;


// import Button from "@restart/ui/esm/Button";
// import React, { useContext, useRef, useEffect, useState } from "react";
// import Cards from "./Cards"

// import { useAuth } from "../config/Authentication.js";
// import { Link, useHistory } from "react-router-dom";
// import { Form, Alert } from 'react-bootstrap';
// import { db, usersCollection } from "../firebase";

//  export default function Profile() {
//     const {currentUser, updatePassword, updateEmail} = useAuth();
//     const [dbData, setdbData] = useState([]); // retrieving firestore db info
//     const updateEmailRef = useRef()
//     const updatePasswordRef = useRef()
//     const userNameRef = useRef()
//     const [error, setError] = useState("")
//     const [loading, setLoading] = useState(false)
//     const history = useHistory()
//     const isLogginActive = useRef()

//    /* UNCOMMENT to check DB data: Displays current user's information in console.log */
//    if (isLogginActive) {
//       usersCollection.doc(currentUser.uid).get()
//         .then((doc) => {
//           if (doc.exists) {
//             console.log("DATA: ", doc.data())
//           }
//           else {
//             console.log("ERROR")
//           }
//         }).catch(e => {
//           console.log("ERROR GETTING DOC", e)
//         })
//     } else{
//       history.push("/login")
//     }
//     /********************************************************************************/
//    async function handleSubmit(e) {
//      e.preventDefault()

//      try {
//        setError("")
//        setLoading(true)
//        // Query for existing username
//        db.collection("users").where('username', '==', userNameRef.current.value).get()
//        .then((doc) =>{
//          if(!doc.empty){
//            alert("username already exists")
//            console.log("ERROR: username already exists")
//          } else {
//            // UPDATES FIRESTORE DB fields
//            db.collection("users").doc(currentUser.uid).update({
//              // email: "atk12345@gmail.com"
//              email: updateEmailRef.current.value,
//              password: updatePasswordRef.current.value,
//              username: userNameRef.current.value
//            })
//          }
//        })
       
//        const em = await updateEmail(updateEmailRef.current.value)
//        const pw = await updatePassword(updatePasswordRef.current.value)
//        // UPDATES FIREBASE Auth
//        if (em && pw) {
//          db.collection("users").doc(currentUser.uid).update({
//            email: updateEmailRef.current.value,
//            password: updatePasswordRef.current.value
//          })
//            .then(() => {
//              console.log('UPDATED');
//            }).catch(e => {
//              console.log('Error updating: ', e);
//            });
//        }
//        history.push("/profile") //goes to home page
//      } catch {
//        setError("Failed UPDATE")
//      }

//      setLoading(false)
//    }
   
//       return (
//         <div>
//           <p>{currentUser && currentUser.email}</p>
//           <Form id="info" onSubmit={handleSubmit}>
//             <Form.Group id="username">
//               <Form.Control
//                 type="username"
//                 placeholder="username"
//                 ref={userNameRef} required
//                 style={{
//                   color: 'black',
//                   fontFamily: "Raleway",
//                   background: 'white',
//                   border: '1px solid #1DE19B',
//                   borderRadius: '40px',
//                   padding: '4px 18px',
//                   alignItems: 'right',
//                   height: '35px',
//                   width: '360px',
//                   display: 'inline',
//                   margin: '10px'
//                 }}>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group id="email">
//               <Form.Control
//                 type="email"
//                 placeholder="email"
//                 ref={updateEmailRef} required
//                 style={{
//                   color: 'black',
//                   fontFamily: "Raleway",
//                   background: 'white',
//                   border: '1px solid #1DE19B',
//                   borderRadius: '40px',
//                   padding: '4px 18px',
//                   alignItems: 'right',
//                   height: '35px',
//                   width: '360px',
//                   display: 'inline',
//                   margin: '10px'
//                 }}>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Control
//                 type="password"
//                 placeholder="password"
//                 ref={updatePasswordRef} required
//                 style={{
//                   color: 'black',
//                   fontFamily: "Raleway",
//                   background: 'white',
//                   border: '1px solid #1DE19B',
//                   borderRadius: '40px',
//                   padding: '4px 18px',
//                   alignItems: 'right',
//                   height: '35px',
//                   width: '360px',
//                   display: 'inline',
//                   margin: '10px'
//                 }}>
//               </Form.Control>
//             </Form.Group>
//             <Button type="registerButton"
//               style={{
//                 color: 'white',
//                 fontFamily: "Raleway",
//                 background: '#1DE19B',
//                 border: '2px solid #19B47C',
//                 borderRadius: '20px',
//                 padding: '6px 18px',
//                 alignItems: 'right',
//                 margin: '10px'
//               }}
//               disabled={loading}>
//               enter
//             </Button>
//           </Form>
          
//           <Cards />
          
//         </div>
//       );
//   }
  
 