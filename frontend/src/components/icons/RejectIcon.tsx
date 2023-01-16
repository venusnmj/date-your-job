import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface RejectIconProps {}

const RejectIcon = (props: RejectIconProps) => {
  const {} = props;
  
  return (
    <div>
      <button className='hover:bg-gray-200 text-red-900 rounded-full h-10 w-10 flex items-center justify-center shadow-md'><FaTimes/></button>
    </div>
  );
};

export default RejectIcon;
