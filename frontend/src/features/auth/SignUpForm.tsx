import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components'
import { useFetch } from '../../hooks';
import { useAlert } from '../../hooks/useAlert';
import useIsLoggedIn from './hooks/useIsLoggedIn';

export const SignUpForm = () => {
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
    
    fetch.post('/users', {
      email: email,
      password: password,
    })
      .then(() => {
        showAlert('success', 'Account created!');

        // show alert for a while before moving to another page
        setTimeout(() => {
          navigate('/signin');
          navigate(0);
        }, 1000)
      })
      .catch((e) => showAlert('error', e.message))
  }

  return (
    <>
      <AlertComponent />
      <div className="bg-blue-500 flex items-center justify-center p-12 h-screen">
        <div className="bg-white p-12 border-solid border-2 border-gray-500">
          <form onSubmit={onSubmitHandler}>
            <div className="space-y-4">
              {/* Title */}
              <p className="font-bold text-5x1">Create your profile</p>

              {/* Email */}
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Email
              </label>
              <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
              </div>

              {/* Password */}
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

              {/* Register button */}
              <div className='pt-6'>
                <Button label ="Register"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
