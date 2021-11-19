import { React, useRef, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { VscChromeClose } from "react-icons/vsc";
import image from "../../../Images/food_cropped.png";
import axios from "axios";
import { db } from "../../../firebase";
import { useAuth } from "../../../config/Authentication.js";

import "./Upload.css";
import "../Recipes.css";

export default function UploadRecipe() {
    const tags =["vegan", "keto friendly", "paleo", "atkins", "calorie lite",
        "pescatarian", "vegetarian"];
    const titleRef = useRef()
    const timeRef = useRef()
    const infoRef = useRef()
    const currentUser = useAuth();

    // const username = db.collection("users").where('username', '==', userNameRef.current.value).get()

    const [title, setTitle] = useState("")
    const [estimatedPrepTime, setEstimatedTime] = useState("")
    const [selectedTags, setTags] = useState([])
    const [tempHashtag, setTempHashTag] = useState("")
    const [hashtag, setHashtags] = useState([])
    const [tempIngredient, setTemp] = useState("")
    const [ingredient, setIngredients] = useState([])
    const [description, setDescription] = useState("")
    const [recipeImage, setRecipeImage] = useState(null)
    
    const addHashtag = () =>{
        var temp = [...hashtag]
        temp.push(tempHashtag)
        setHashtags(temp)
    }
    const removeHashtag = (index) =>{
        var temp = [...hashtag]
        temp.splice(index, 1)
        setHashtags(temp)
    }
    const addIngredient = () =>{
        var temp = [...ingredient]
        temp.push(tempIngredient)
        setIngredients(temp)
    }

    const removeIngredient = (index) => {
        var temp = [...ingredient]
        temp.splice(index, 1)
        setIngredients(temp)
    }

    const changeTag = (tag) => {
        var temp = [...selectedTags]
        if (temp.includes(tag)){
            var index = temp.indexOf(tag)
            temp.splice(index, 1)
            setTags(temp)
        }
        else{
            temp.push(tag)
            setTags(temp)
        }
    }

    //called when user clicks on the file input and selects a picture
    //sets the RecipeImage state variable but doesn't do anything with backend/S3
    const handleUploadRecipe = (e) => {
        if(e.target.files[0].type === "image/jpeg"){
            setRecipeImage(e.target.files)
        }
    }

    //called when user clicks on Submit button
    //sends image data to backend which will handle uploading to S3
    const uploadRecipe = (recipe, filetype) => {
        return axios.post('http://localhost:5000/upload', {
            title: title,
            estimatedTime: estimatedPrepTime,
            selectedTags: selectedTags, 
            hashtag: hashtag,
            ingredient: ingredient,
            description: description, 
            data: recipe, 
            type: filetype,
            userName: currentUser["currentUser"]
        }).then(res => {
            return res;
        });
    }

    const handleSubmit = (e) => {
        //uncomment if u dont want the page to refresh and reset on form submit
        // e.preventDefault()
        console.log("clicked handle submit")
        console.log(title)  

        if(recipeImage !== null){
            // upload resume to s3 bucket
            const reader = new FileReader();
            reader.readAsDataURL(recipeImage[0]);
            reader.onload = async (e) => {
                const json = JSON.stringify({
                    dataURL: reader.result
                });
                const base64 = JSON.parse(json).dataURL;
                const filetype = recipeImage[0].type;
                const newBase64 = base64.replace(`data:${filetype};base64,`, '');
                const res = await uploadRecipe(newBase64, filetype);
                // save recipe to mongodb
                // const resumeData = {
                //     link: res.data.s3Url,
                //     uploadDate: res.data.uploadDate,
                //     email: email,
                //     major: info.major
                // };
                // await saveResume(resumeData);
                setRecipeImage(null);
            };
        }
    }

    return(
        <div>
            <Container className="mt-5">
                <Form onSubmit={handleSubmit}>
                <Row>
                    
                    <Col>
                    <h1 style={{textAlign: 'center'}}>Write your food story</h1>
                            <Form.Group id = "title">
                            <Form.Control 
                                    type="textarea" 
                                    placeholder = "title" 
                                    ref={titleRef} required 
                                    onChange= {e => setTitle(e.target.value)}
                                    style={{
                                        color: 'black',
                                        fontFamily: "Raleway",
                                        background: 'white',
                                        border: '1px solid #1DE19B',
                                        borderRadius: '40px',
                                        padding: '4px 18px',
                                        alignItems: 'right',
                                        height: '35px',
                                        width: '360px',
                                        display: 'inline',
                                        margin: '10px'
                                    }}>
                                </Form.Control>
                                <Form.Control 
                                    type="title" 
                                    placeholder = "prep time" 
                                    ref={timeRef} required 
                                    onChange= {e => setEstimatedTime(e.target.value)}
                                    style={{
                                        color: 'black',
                                        fontFamily: "Raleway",
                                        background: 'white',
                                        border: '1px solid #1DE19B',
                                        borderRadius: '40px',
                                        padding: '4px 18px',
                                        alignItems: 'right',
                                        height: '35px',
                                        width: '360px',
                                        display: 'inline',
                                        margin: '10px'
                                    }}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id = "ingredients">
                            <Form.Control 
                                    type="ingredients" 
                                    placeholder = "ingredients" 
                                    ref={infoRef} required 
                                    onChange= {e => setTemp(e.target.value)}
                                    style={{
                                        color: 'black',
                                        fontFamily: "Raleway",
                                        background: 'white',
                                        border: '1px solid #1DE19B',
                                        borderRadius: '40px',
                                        padding: '4px 18px',
                                        alignItems: 'right',
                                        height: '35px',
                                        width: '360px',
                                        display: 'inline',
                                        margin: '10px'
                                    }}>
                                </Form.Control><br></br>
                                <Button type="button"
                        
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

                            onClick={addIngredient}

                            // disabled={loading}
                            >
                            add ingredient
                        </Button><div>
                        {ingredient.map((item, index)=>{
                            // console.log(item)
                            return (
                            <span className="mx-2" key={index}>
                                {item} <VscChromeClose size ='10px' onClick={() => removeIngredient(index)}/> 
                            </span>
                            )
                        })}
                        </div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control type="file"
                                style={{
                                    width: '75%'
                                }}
                                onChange={handleUploadRecipe}
                                />
                            </Form.Group>
                            <Form.Group id = "body">
                                <Form.Control as="textarea"
                                    type="body" 
                                    placeholder = "enter recipe instructions here!" 
                                    ref={infoRef} required 
                                    onChange= {e => setDescription(e.target.value)}
                                    style={{
                                        color: 'black',
                                        fontFamily: "Raleway",
                                        background: 'white',
                                        border: '1px solid #1DE19B',
                                        borderRadius: '40px',
                                        height: '360px',
                                        width: '75%'
                                    }}>
                                </Form.Control>
                                {}
                            </Form.Group>
                        </Col>
                    </Row>
    <Row><Col><div className="tagformat">
        {
            tags.map((item, index) =>{
                if(selectedTags.includes(item)){
                    return <Button key={index} variant="outlined" id="selected" className="tag" onClick={() => changeTag(item)}>{item}</Button>
                }
                else{
                    return <Button key={index} variant="outlined" id="outlined" className="tag" onClick={() => changeTag(item)}>{item}</Button>   
                }
            })
        }
        <div className="mt-3">
                        <Button type="postButton submit"
                        
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
                            // disabled={loading}
                            >
                            post
                        </Button></div>
        </div>
        
    </Col>
    <Col xs={6}><div className="d-flex justify-content-left"><div className="tagtext">Any tags you'll like to add?</div></div>
    <div className="d-flex justify-content-left">
    <Form.Group id = "hashtag">
                            <Form.Control 
                                    type="hashtags" 
                                    placeholder = "enter hashtag" 
                                    ref={infoRef} required 
                                    onChange= {e => setTempHashTag(e.target.value)}
                                    style={{
                                        color: 'black',
                                        fontFamily: "Raleway",
                                        background: 'white',
                                        border: '1px solid #1DE19B',
                                        borderRadius: '40px',
                                        padding: '4px 10px',
                                        alignItems: 'right',
                                        height: '35px',
                                        width: '360px',
                                        display: 'inline',
                                        margin: '10px'
                                    }}>
                                </Form.Control>
                                <Button type="button"
                        
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

                            onClick={addHashtag}

                            // disabled={loading}
                            >
                            add hashtag
                        </Button><div>
                        {hashtag.map((item, index)=>{
                            return (
                            <span className="mx-2" key={index}>
                                {item} <VscChromeClose size ='10px' onClick={() => removeHashtag(index)}/> 
                            </span>
                            )
                        })}
                        </div>
                            </Form.Group>
    </div>
    </Col></Row>
    </Form>
    </Container>
    <div className="d-flex justify-content-end"><img src={image} style={{width: "auto", height: "600px"}}></img></div></div>
 
    )
}