import React from 'react'
import { Button } from '../../components'

export const SignUpForm = () => {

  return (
    <div className="bg-blue-500 flex items-center justify-center p-12 h-screen">
  <div className="bg-white p-12 border-solid border-2 border-gray-500 " x-data="app">
            <div x-show="isLoginPage" className="space-y-4">
                <p className="font-bold text-5x1">Create your profile</p>
                <label className="mb-3 block text-base font-medium text-[#07074D]">
              Email
            </label>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="example@gmail.com"
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <label className="mb-3 block text-base font-medium text-[#07074D]">
              Password
            </label>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                 <input type="password" placeholder="*******"
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div className='pt-6'>
                <Button label ="Register"/>
                </div>
                <div>
                </div>
            </div>
        </div>
        </div>
        

  )
}
