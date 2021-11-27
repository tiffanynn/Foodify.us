import React from "react";
import ProfileInfo from "./ProfileInfo";
import RecipeInfo from "./Recipes/RecipeInfo";
import Comment from "./Comment";
import { Container, Row, Col, Image } from "react-bootstrap";

import axios from 'axios';
import { useEffect, useState } from "react";
import {useAuth} from '../config/Authentication' 

function Profile() {

  // const ProfileData = {

  //   username : "eats_by_franco",
  //   bio : "Cook the change you want to see in the world - Gandhi",
  //   recipes: "49",
  //   followers: "241",

  // };
  const {currentUser} = useAuth()  
  let [recipeStateData, setRecipeStateData] = useState([]); // recipeStateData Initialized to Null
  let [profileStateData, setProfileStateData] = useState([]);
  let [reviewStateData, setReviewStateData] = useState([]);
  const [recipeAndReviewData, setRecipeAndReviewData] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const apiCall = async(ind) => {
    const [recipeData, reviewData] = await Promise.all([
      axios.get(`http://localhost:5000/recipe/${recipes[ind]}`),
      axios.get(`http://localhost:5000/review/recipeid/${recipes[ind]}`)
    ])
    return [recipeData, reviewData];
    // setRecipeStateData(recipeData.data);
    // setReviewStateData(reviewData.data);
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${currentUser.uid}`)
    .then(response => {
      setProfileStateData(response.data);      
      setRecipes(response.data.user[0].recipeIdList)
    })
  },[])

  useEffect(() => {   
    const getAllRecipeReview = async() => {
      if (recipes.length > 0){
        const formattedData = await Promise.all(recipes.map(async(recipe, ind) => {
  
          const data = await apiCall(ind)
          
          const returnObj = {
            recipe: data[0].data.recipe,
            reviews: data[1].data.reviews 
          }
          return returnObj;
        }))
        
        setRecipeAndReviewData(formattedData)
      }
    }

    getAllRecipeReview()
  }, [recipes])

  useEffect(() => {
    console.log('recipe and review data');
    console.log(recipeAndReviewData)
  }, [recipeAndReviewData])

  // //Fetches Recipe Data From API (After Component Is Rendered),
  // //Saves Data to State using 'setRecipeStateData'
  // useEffect(() => {
  //   fetch(`http://localhost:5000/recipe/619a1a8c8f4c97accad10a75`)
  //   // console.log(recipes.length)
  //   // if (recipes?.length > 0){
  //     // fetch(`http://localhost:5000/recipe/${recipes[0]}`)
  //       .then((response) => response.json())
  //       // Setting recipe Data to the data that we received from the response above
  //       .then((data) => {
  //         console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
  //         setRecipeStateData(data);
  //       });
  //   // }

  // }, []);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/user/${currentUser.uid}

  //   `)
  //     .then((response) => response.json())
  //     // Setting recipe Data to the data that we received from the response above
  //     .then((data) => {
  //       console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
  //       setProfileStateData(data);
  //       setRecipes(data.recipeIdList)
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/review/recipeid/619a1a8c8f4c97accad10a75

  //   `)
  //     .then((response) => response.json())
  //     // Setting recipe Data to the data that we received from the response above
  //     .then((data) => {
  //       console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
  //       setReviewStateData(data);
  //     });
  // }, []);

    return (
      <Container className="mt-5">
        <Row>
          {profileStateData.length == 0 ? (
              <div>Loading Profile</div>
            ) : (
              <ProfileInfo ProfileData={profileStateData.user[0]} />                            
            )}
        </Row>

        {recipeAndReviewData.map(obj => (
          <Row>
            <Col lg={2}></Col>
            <Col>
              <RecipeInfo recipeData={obj.recipe}/>
              {obj.reviews.map(review => (<Comment reviewData={review} />))}
            </Col>
          </Row>
        ))}
        {/* <Row>
          <Col lg={2}></Col>
          <Col>
            {recipeStateData.length == 0 ? (
              <div>Loading Recipe</div>
            ) : (
              // <RecipeInfo recipeData={recipeStateData.recipe[0]} />            
              <div>hello</div>
            )}
            <h2> Comments </h2>

            {reviewStateData.length == 0 ? (
              <div>Loading Review</div>
            ) : (
              // reviewStateData.reviews.map(data => <Comment ReviewData={data} />)              
              <div>hello</div>
            )}
          </Col>
        </Row> */}
        
      </Container>
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