import Button from "@restart/ui/esm/Button";
import React, { useContext, useRef, useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

import { useAuth } from "../config/Authentication.js";
import { Link, useHistory } from "react-router-dom";
import { Form, Card, Alert, Col, Row } from "react-bootstrap";
import { db, usersCollection } from "../firebase";

import dessert from "../Images/dessert.png"

export default function EditProfile() {
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [dbData, setdbData] = useState([]); // retrieving firestore db info
  const updateEmailRef = useRef();
  const updatePasswordRef = useRef();
  const userNameRef = useRef();
  const bioRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const history = useHistory();
  const isLogginActive = useRef();

  useEffect(() => {
    if(currentUser) {
      axios.get(`http://localhost:5000/user/${currentUser.uid}`)
      .then(data => {
        console.log(data)
        setEmail(currentUser.email)
        setBio(data.data.user[0].bio)
        setUsername(data.data.user[0].userName)
      })      
    }
  },[])

  const handleProfilePic = (e) => {
    //uncomment if u dont want the page to refresh and reset on form submit
    e.preventDefault()
    console.log("clicked handle submit")
    const file = e.target.files[0]
    if(file.type === "image/jpeg"){
        // upload resume to s3 bucket
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (e) => {
            const json = JSON.stringify({
                dataURL: reader.result
            });
            const base64 = JSON.parse(json).dataURL;
            const filetype = file.type;
            const newBase64 = base64.replace(`data:${filetype};base64,`, '');
            console.log(currentUser)
            return axios.post('http://localhost:5000/profile/upload', {
              data: newBase64, 
              type: filetype,
              userId: currentUser["uid"]
          }).then(res => {
              console.log(res)
              window.location.reload()
              return res;
          });        };
    }
}

  async function handleSubmit(e) {
    e.preventDefault();

    if (bioRef.current.value !== bio) {
      axios.get(`http://localhost:5000/profileedit/bio/${currentUser.uid}/${bioRef.current.value}`)
      .then(response => console.log('response', response))
    }

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
              email: updateEmailRef.current.value,
              password: updatePasswordRef.current.value,
              username: userNameRef.current.value,
            });
            console.log("CURRENT USER UID: ", currentUser.uid);
            // MongoDB stuffs goes here
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
      // setError("Failed UPDATE");
      // history.push("/profile");
    }    
    setLoading(false);
  }

  return (
    <>
      <Card style={{ border: "white" }}>
        <Card.Body>
          <h2 className="text-center mb-4" 
            style={{ 
              color: "#000000", fontWeight: "bold", fontSize: "40px", fontFamily: "Raleway" 
            }}>Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row> 
            <Col>
              <img src={dessert}
                style={{
                  align: "left",
                  marginTop: "-160px",
                  height: "1000px",
                  width: "810px",
                  display: "inline",
                  position: "static",
                  flexdirection: "column",
                  marginLeft: "130px"
                }}
              >
              </img>
            </Col>
            <Col>
              <Form id="info" onSubmit={handleSubmit}>
                <Form.Label>
                  <div style={{ minWidth: "120px", marginRight: "200px" }}>
                    <b>  - Upload your profile picture - </b>
                  </div>
                </Form.Label>
                <Form.Group><Form.Control type="file"
                  style={{
                    margin: '10px',
                    width: '50%',
                    alignItems: 'right',
                    display: 'inline',
                    marginRight: "200px"
                  }}
                  onChange={handleProfilePic}
                />
                </Form.Group>
                <Form.Label>
                  <div style={{ minWidth: "120px", marginTop: "150px", marginRight: "200px"  }}>
                    <b> - Update your information - </b>
                  </div>
                </Form.Label>
                <Form.Group id="username" style={{ marginRight: "300px" }}>
                  {/* <div style = {{border: "1px solid red", display: "flex"}}> */}
                  <Form.Label>
                    <div style={{ minWidth: "120px" }}>
                      Username
                    </div>
                  </Form.Label>
                  {/* </div> */}
                  <Form.Control
                    type="username"
                    ref={userNameRef}
                    required
                    defaultValue={username}
                    placeholder={username}
                    style={{
                      color: 'black',
                      fontFamily: "Raleway",
                      background: 'white',
                      border: '1px solid #1DE19B',
                      borderRadius: '40px',
                      padding: '4px 18px',
                      alignItems: 'right',
                      height: '35px',
                      width: '50%',
                      display: 'inline',
                      margin: '10px'
                    }}
                  />
                </Form.Group>
                <Form.Group id="bio" style={{ marginRight: "300px" }}>
                  {/* <div style = {{border: "1px solid red", display: "flex"}}> */}
                  <Form.Label>
                    <div style={{ minWidth: "120px" }}>
                      Bio
                    </div>
                  </Form.Label>
                  {/* </div> */}
                  <Form.Control
                    type='username'
                    ref={bioRef}
                    required
                    // defaultValue={currentUser.email}
                    placeholder={bio}
                    defaultValue={bio}
                    style={{
                      color: 'black',
                      fontFamily: "Raleway",
                      background: 'white',
                      border: '1px solid #1DE19B',
                      borderRadius: '40px',
                      padding: '4px 18px',
                      alignItems: 'right',
                      height: '35px',
                      width: '50%',
                      display: 'inline',
                      margin: '10px'
                    }}
                  />
                </Form.Group>
                <Form.Group id="email" style={{ marginRight: "300px" }}>
                  <Form.Label>
                    <div style={{ minWidth: "120px" }}>
                      Email
                    </div>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    ref={updateEmailRef}
                    required
                    placeholder={email}
                    value={email}
                    disabled
                    style={{
                      color: 'black',
                      fontFamily: "Raleway",
                      background: 'white',
                      border: '1px solid #1DE19B',
                      borderRadius: '40px',
                      padding: '4px 18px',
                      alignItems: 'right',
                      height: '35px',
                      width: '50%',
                      display: 'inline',
                      margin: '10px'
                    }}
                  />
                </Form.Group>
                <Form.Group id="password" style={{ marginRight: "300px" }}>
                  <Form.Label>
                    <div style={{ minWidth: "120px" }}>
                      Password
                    </div>
                  </Form.Label>
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
                      width: '50%',
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
                    margin: '10px',
                    marginRight: "200px"
                  }}
                // onClick={addIngredient}
                // disabled={loading}
                >
                  update
                </Button>
              </Form>
            </Col>
          </Row>
          
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
