import React from 'react';

interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  const { label } = props;

  return (
    <button className="rounded-2xl border-b-2 border-b-gray-300 bg-white py-3 px-4 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200 w-full">
      {label}
    </button>
  );
};

export default Button;
