import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface RejectIconProps {}

const RejectIcon = (props: RejectIconProps) => {
  
  return (
    <div>
      <button className='bg-white hover:bg-gray-200 text-red-900 rounded-full h-16 w-16 text-2xl flex items-center justify-center shadow-md ml-4 transition
      active:translate-x-96 active:hidden '><FaTimes/></button>
    </div>
  );
};

export default RejectIcon;
