import React, { useState } from 'react';
import { Card } from '../components';
import { CardProps } from '../components/cards';
import { HeartIcon, RejectIcon } from '../components/icons';

export const SwipePage = () => {
  
    const cardProp: CardProps = {
        image: "https://images.unsplash.com/photo-1543165365-07232ed12fad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        alt: "image alt text",
        cardTitle: "Intern name",
        cardDesc: "Aspiring full-stack developer in NTU",
        tags: [
          {tagName: "Python"},
          {tagName: "JavaScript"},
          {tagName: "HTML"}
        ]
      }

      const [swipeRight, isSwipeRight] = useState(false);

      function toRight(){
        isSwipeRight(true);
      }

    
    
      return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-blue-500">
            <Card image={cardProp.image} alt={cardProp.alt} cardTitle={cardProp.cardTitle} cardDesc={cardProp.cardDesc} tags={cardProp.tags}/>
          <div className='flex relative top-4'>
            <HeartIcon></HeartIcon>
            <RejectIcon></RejectIcon>
          </div>
        </div>
      )
}