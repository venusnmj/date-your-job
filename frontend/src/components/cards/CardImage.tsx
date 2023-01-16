import React from 'react'

export interface CardImageProps {
  image: string;
  alt: string;
}

export const CardImage = (props: CardImageProps) => {
  const { image, alt } = props;

  return (
    <img className="w-full max-h-96 object-cover object-center" src={image} alt={alt}/>
  )
}

