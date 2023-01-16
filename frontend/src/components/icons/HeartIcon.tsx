import React from 'react';
import { FaHeart } from 'react-icons/fa';

interface HeartIconProps {}

const HeartIcon = (props: HeartIconProps) => {
  return <div>
    <button className='text-red-500  hover:bg-gray-200 hover:text-red-800 rounded-full h-10 w-10 flex items-center justify-center shadow-md' ><FaHeart /></button>
  </div>
  };

export default HeartIcon;
