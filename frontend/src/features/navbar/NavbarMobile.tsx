import React from 'react';
import { FaCheck, FaHome, FaUnlock, FaUserCheck, FaUserSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks';
import useIsLoggedIn from '../auth/hooks/useIsLoggedIn';

export const NavbarMobile = () => {
  const { isLoggedIn } = useIsLoggedIn();

  const navigate = useNavigate();
  const fetch = useFetch();

  const handleLogout = () => {
    fetch.get('/auth/logout').then(() => {
      navigate('/signin');
      navigate(0);
    });
  }
  
  return (
    <div id="nav-container" className="flex md:hidden gap-8 w-full fixed bottom-0 justify-center items-center py-[24px] px-[48px] bg-blue-500 text-white border-t border-blue-400">
      <div className="group cursor-pointer flex flex-col items-center justify-center gap-1">
        <div className="border p-2 rounded-3xl group-hover:text-amber-400 group-hover:border-amber-400 w-min">
          <FaHome />
        </div>
        <div 
          className="group-hover:text-amber-400"
          onClick={() => navigate('/')}
        >
          Discover
        </div>
      </div>
      <div 
        className="group cursor-pointer flex flex-col items-center justify-center gap-1"
        onClick={() => navigate('/applied')}
      >
        <div className="border p-2 rounded-3xl group-hover:text-amber-400 group-hover:border-amber-400 w-min">
          <FaCheck />
        </div>
        <div className="group-hover:text-amber-400">
          Applied
        </div>
      </div>
      <div>
      {isLoggedIn ? 
          (
            <div
              className="group cursor-pointer flex flex-col items-center justify-center gap-1"
              onClick={handleLogout}
            >
              <div className="border p-2 rounded-3xl group-hover:text-amber-400 group-hover:border-amber-400 w-min">
                <FaUserSlash />
              </div>
              <div className="group-hover:text-amber-400">
                Logout
              </div>
            </div>
          ) :
            <div
              className="group cursor-pointer flex flex-col items-center justify-center gap-1"
              onClick={() => navigate('/signin')}
            >
              <div className="border p-2 rounded-3xl group-hover:text-amber-400 group-hover:border-amber-400 w-min">
                <FaUnlock />
              </div>
              <div className="group-hover:text-amber-400">
                Sign in
              </div>
            </div>
        }
      </div>
    </div>
  )
}
