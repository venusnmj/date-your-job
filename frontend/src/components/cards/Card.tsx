import React from 'react';
import { CardBody } from './CardBody';
import { CardImage } from './CardImage';

export interface CardProps {
  image: string;
  alt: string;
  cardTitle: string;
  cardDesc: string;
  tags: Array<{
    tagName: string;
  }>;
}

export const Card = (props: CardProps) => {
  const { image, alt, cardTitle, cardDesc, tags } = props;
  
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg container bg-white">
      <CardImage image={image} alt={alt} />
      <CardBody cardTitle={cardTitle} cardDesc={cardDesc} tags={tags} />
    </div>
  );
};

export default Card;
