import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Vegeterian Burger with homemade sauce and patty'
              label='Vegeterian'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Tofu Steak Quick and eask to make recipe'
              label='Vegan'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Keto food'
              label='Keto'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Spaghetti'
              label='Vegeterian'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Vegan Tacos'
              label='Vegan'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;