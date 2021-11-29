import React from "react";
import "./Cards.css";

import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <div style={{ marginBottom: "40px", marginTop: "40px" }}>
      <>
        <li className="cards__item">
          <Link className="cards__item__link" to={props.path}>
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
            </div>
          </Link>
        </li>
      </>
    </div>
  );
}

export default CardItem;
