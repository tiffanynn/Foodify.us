import React from "react";
import "./CardFeed.css";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";

import { Link } from "react-router-dom";

function CardFeedItem(props) {
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/user/username/${props.username}`)
      .then((response) => response.json())
      // Setting recipe Data to the data that we received from the response above
      .then((data) => {
        console.log("RECIEVED API RESPONSE USER DATA: ", data);
        if (data.user !== null) {
          if (data.user.length > 0) {
            if (data.user[0].profileImgUrl !== null) {
              setUserData(data);
            }
          }
        }
      });
  }, []);

  return (
    <>
      <li className="cards__item">
        <Link className="cards__item__link" to={props.path}>
          <div className="recipe_header">
            {userData !== null && (
              <Image
                src={userData.user[0].profileImgUrl}
                width={50}
                height={50}
                roundedCircle
              />
            )}
            {props.username}
          </div>
          <figure className="cards__item__pic-wrap">
            <img
              className="cards__item__img"
              alt="Food Image"
              src={props.src}
            />
          </figure>
          <div className="cards__item__info">
            <div className="recipe_title">{props.text}</div>
            <h6 className="hashtags">{props.label}</h6>
            <div>
              {" "}
              {props.dietTags.map((tag) => (
                <p>
                  {" "}
                  <Button variant="outlined" id="outlined" className="tag">
                    {tag}
                  </Button>
                </p>
              ))}
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardFeedItem;
