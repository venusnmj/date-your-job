import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components'
import { useFetch } from '../../hooks';
import { useAlert } from '../../hooks/useAlert';
import useIsLoggedIn from './hooks/useIsLoggedIn';

export const SignInForm = () => {
  const navigate = useNavigate();
  
  // Auto Navigation if logged in
  const { isLoggedIn } = useIsLoggedIn();
  if (isLoggedIn) navigate('/');


  const fetch = useFetch();
  const { AlertComponent, showAlert } = useAlert();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onSubmitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    
    fetch.post('/auth/login', {
      email: email,
      password: password,
    })
      .then(() => {
        navigate('/');
        navigate(0);
      })
      .catch((e) => showAlert('error', e.message))
  }

  return (
    <div>
      <AlertComponent />
      <div className="bg-blue-500 flex items-center justify-center p-12 h-screen">
        <div className="bg-white p-12 border-solid border-2 border-gray-500 ">
        {/* Title */}
        <p className="font-bold text-5x1">Sign In</p>

        {/* Form */}
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-wrap">
            {/* Email + Register Link*/}
            <div className="mb-5 mt-[16px]">
              <div className="flex flex-row justify-between">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Email
                </label>
                {/* Register link */}
                <a className="underline hover:text-red-500" href="/signup">Register</a>
              </div>
              {/* Email Input */}
              <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                <input
                  type="text"
                  placeholder="example@abc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-3 w-full border-none bg-transparent outline-none focus-within:ring-blue-400"
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Password
            </label>
            <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
          </div>
          </div>
          <div className="pt-6">
            <Button label="Sign In"></Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
