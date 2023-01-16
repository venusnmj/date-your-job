import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks';

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate();
  const fetch = useFetch();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    fetch.get('/auth/profile').then(data => {
      if (data) setIsLoggedIn(true);
    })
  })

  return (
    <div id="nav-container" className="flex w-full backdrop-blur justify-center sm:justify-between items-center fixed py-[24px] px-[48px] bg-blue-500 text-white shadow">
      <div className="flex flex-row justify-center gap-[36px] md:gap-[72px]">
        <a href="/" className="text-2xl font-bold hover:text-amber-400 cursor-pointer">DateYourJob</a>
        <div className="gap-8 md:gap-12 items-center hidden sm:flex">
          <a href="/discover" className="py-[6px] px-[8px] font-bold hover:text-amber-400 cursor-pointer">01. Discover</a>
          <a href="/applied" className="py-[6px] px-[8px] font-bold hover:text-amber-400 cursor-pointer">02. Applied</a>
        </div>
      </div>
      <div className="hidden sm:flex gap-12">
        {isLoggedIn ? 
          (
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer" onClick={() => navigate('settings')}>
              <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
          ) :
            <button className="cursor-pointer bg-amber-300 text-black px-[12px] rounded hover:bg-amber-400" onClick={() => navigate('/signin')}>
              Sign in
            </button>
        }
      </div>
    </div>
  );
};

export default Navbar;
