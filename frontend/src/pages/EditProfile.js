import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import Cards from "./Cards";

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form, Card, Alert } from "react-bootstrap";
import { db, usersCollection } from "../firebase";

export default function EditProfile() {
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [dbData, setdbData] = useState([]); // retrieving firestore db info
  const updateEmailRef = useRef();
  const updatePasswordRef = useRef();
  const userNameRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const isLogginActive = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // Query for existing username
      db.collection("users")
        .where("username", "==", userNameRef.current.value)
        .get()
        .then((doc) => {
          if (!doc.empty) {
            alert("username already exists");
            console.log("ERROR: username already exists");
          } else {
            // UPDATES FIRESTORE DB fields
            db.collection("users").doc(currentUser.uid).update({
              // email: "atk12345@gmail.com"
              email: updateEmailRef.current.value,
              password: updatePasswordRef.current.value,
              username: userNameRef.current.value,
            });
            console.log("CURRENT USER UID: ", currentUser.uid);
            //MongoDB stuffs goes here
            const userID = currentUser.uid;
            fetch(
              `http://localhost:5000/usersignupfinalize/${userID}/${userNameRef.current.value}`
            )
              .then((response) => response.json())
              .then((response) => console.log(response));
          }
        });

      const em = await updateEmail(updateEmailRef.current.value);
      const pw = await updatePassword(updatePasswordRef.current.value);
      // UPDATES FIREBASE Auth
      if (em && pw) {
        db.collection("users")
          .doc(currentUser.uid)
          .update({
            email: updateEmailRef.current.value,
            password: updatePasswordRef.current.value,
          })
          .then(() => {
            console.log("UPDATED");
          })
          .catch((e) => {
            console.log("Error updating: ", e);
          });
      }
      history.push("/profile"); //goes to home page
    } catch {
      setError("Failed UPDATE");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form id="info" onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                ref={userNameRef}
                required
                // defaultValue={currentUser.email}
                placeholder = "username"
                style={{
                  color: 'black',
                  fontFamily: "Raleway",
                  background: 'white',
                  border: '1px solid #1DE19B',
                  borderRadius: '40px',
                  padding: '4px 18px',
                  alignItems: 'right',
                  height: '35px',
                  width: '1600px',
                  display: 'inline',
                  margin: '10px'
              }}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={updateEmailRef}
                required
                placeholder="email"
                style={{
                  color: 'black',
                  fontFamily: "Raleway",
                  background: 'white',
                  border: '1px solid #1DE19B',
                  borderRadius: '40px',
                  padding: '4px 18px',
                  alignItems: 'right',
                  height: '35px',
                  width: '1610px',
                  display: 'inline',
                  margin: '10px'
              }}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={updatePasswordRef}
                required
                placeholder="password"
                style={{
                  color: 'black',
                  fontFamily: "Raleway",
                  background: 'white',
                  border: '1px solid #1DE19B',
                  borderRadius: '40px',
                  padding: '4px 18px',
                  alignItems: 'right',
                  height: '35px',
                  width: '1600px',
                  display: 'inline',
                  margin: '10px'
              }}
              />
            </Form.Group>
            {/* <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button> */}

                    <Button type="submit"
                        
                        style={{
                            color: 'white',
                            fontFamily: "Raleway",
                            background: '#1DE19B',
                            border: '2px solid #19B47C',
                            borderRadius: '20px',
                            padding: '6px 18px',
                            alignItems: 'right',
                            margin: '10px'
                        }}
                        // onClick={addIngredient}
                        // disabled={loading}
                        >
                        update
                    </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* <Button type="registerButton"
              style={{
                color: 'white',
                fontFamily: "Raleway",
                background: '#1DE19B',
                border: '2px solid #19B47C',
                borderRadius: '20px',
                padding: '6px 18px',
                alignItems: 'right',
                margin: '10px'
              }}
              disabled={loading}>
              enter
            </Button> */}
    </>
  );
}

// import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../config/Authentication.js";
// import { Link, useHistory } from "react-router-dom"

// export default function EditProfile() {
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const passwordConfirmRef = useRef()
//   const { currentUser, updatePassword, updateEmail } = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const history = useHistory()

//   function handleSubmit(e) {
//     e.preventDefault()
//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Passwords do not match")
//     }

//     const promises = []
//     setLoading(true)
//     setError("")

//     if (emailRef.current.value !== currentUser.email) {
//       promises.push(updateEmail(emailRef.current.value))
//     }
//     if (passwordRef.current.value) {
//       promises.push(updatePassword(passwordRef.current.value))
//     }

//     Promise.all(promises)
//       .then(() => {
//         history.push("/")
//       })
//       .catch(() => {
//         setError("Failed to update account")
//       })
//       .finally(() => {
//         setLoading(false)
//       })
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Update Profile</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 ref={emailRef}
//                 required
//                 defaultValue={currentUser.email}
//               />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 ref={passwordRef}
//                 placeholder="Leave blank to keep the same"
//               />
//             </Form.Group>
//             <Form.Group id="password-confirm">
//               <Form.Label>Password Confirmation</Form.Label>
//               <Form.Control
//                 type="password"
//                 ref={passwordConfirmRef}
//                 placeholder="Leave blank to keep the same"
//               />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               Update
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         <Link to="/">Cancel</Link>
//       </div>
//     </>
//   )
// }
