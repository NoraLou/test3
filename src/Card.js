import React, { Component } from 'react';

const Card = (props) => {
  return (
    <div>
      <img src={props.imgSrc} alt={props.value}/>
    </div>
  );
}

export default Card;
