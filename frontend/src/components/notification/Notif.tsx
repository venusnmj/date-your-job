import React from 'react';

export interface NotifProps {
  Title: string;
  Day: string;
  Picture: string;
}

const Notif = (props: NotifProps) => {
  const { Title, Day, Picture} = props;

  return (
    <div className='flex flex-row bg-gray-200 p-3'>
      <div>
        <img src = {Picture} className='rounded-full h-20 w-20 flex items-center justify-center'></img>
      </div>
      <div className='p-5 flex items-center justify-between'>
        <h1 className='font-bold'>{Title}</h1>
        <h1> &nbsp;matched with you! </h1>
        <h1 className='text-gray-400'>&nbsp; {Day}</h1>
      </div>
    </div>
  );
};

export default Notif;
