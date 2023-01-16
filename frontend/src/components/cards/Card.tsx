import React from 'react';
import { CardBody } from './CardBody';
import { CardImage } from './CardImage';

const Card = () => {
  return (
    <div id="card-container" className="">
      <CardImage />
      <CardBody />
    </div>
  );
};

export default Card;
