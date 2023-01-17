import React, { useState } from 'react';
import { Card } from '../components';
import { CardProps } from '../components/cards';
import { HeartIcon, RejectIcon } from '../components/icons';
import { motion, AnimatePresence } from "framer-motion"

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

      const [isOldVisible, setIsOldVisible] = useState(true);
      const [isNewVisible, setIsNewVisible] = useState(false);
      const handleHeartClick = () => {
        setIsOldVisible(false);
        setTimeout(() => {
          setIsNewVisible(true);
        }, 500)
      };
      const handleRejectClick = () => {
        setIsNewVisible(false);
      }

    
    
      return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-blue-500 minW-[1200px]">
          <AnimatePresence>
            {isNewVisible &&
            <motion.div
              initial={{ opacity: 0, translateX: -360, rotateZ: -45, scale: 0.75 }}
              animate={{ opacity: 1, translateX: 0, rotateZ: 0, scale: 1 }}
              exit={{ opacity: 0, translateX: -360, rotateZ: -45, scale: 0.75 }}
            >
              <Card image={cardProp.image} alt={cardProp.alt} cardTitle={cardProp.cardTitle} cardDesc={cardProp.cardDesc} tags={cardProp.tags}/>
            </motion.div>}
          </AnimatePresence>
          <AnimatePresence>
            {isOldVisible &&
            <motion.div
              initial={{ opacity: 0, translateX: -360, rotateZ: -45, scale: 0.75 }}
              animate={{ opacity: 1, translateX: 0, rotateZ: 0, scale: 1 }}
              exit={{ opacity: 0, translateX: 360, rotateZ: 45, scale: 0.75 }}
            >
              <Card image={cardProp.image} alt={cardProp.alt} cardTitle={cardProp.cardTitle} cardDesc={cardProp.cardDesc} tags={cardProp.tags}/>
            </motion.div>}
          </AnimatePresence>
          
          <div className='flex relative top-4'>
            <div onClick={handleHeartClick}>
              <HeartIcon />
            </div>
            <div onClick={handleRejectClick}>
              <RejectIcon />
            </div>
          </div>
        </div>
      )
}