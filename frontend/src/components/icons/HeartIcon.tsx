import React from 'react';
import { FaHeart } from 'react-icons/fa';

export interface HeartIconProps {

}

export const HeartIcon = (props: HeartIconProps) => {

  return <div>
    <button className='text-red-500 bg-white  hover:bg-gray-200 hover:text-red-800 rounded-full h-16 w-16 text-2xl flex items-center justify-center shadow-md mr-4'><FaHeart /></button>
  </div>
  };

export default HeartIcon;
