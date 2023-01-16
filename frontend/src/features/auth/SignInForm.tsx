import React from 'react'
import { Button, Input } from '../../components'

export const SignInForm = () => {
  return (
    <div className="bg-blue-500 flex items-center justify-center p-12 h-screen">
      <div className="bg-white p-12 border-solid border-2 border-gray-500 ">
      <form action="https://formbold.com/s/FORM_ID" method="POST">
        <div className="flex flex-wrap">
          <div className="mb-5">
            <div className="flex flex-row justify-between">
            <label className="mb-3 block text-base font-medium text-[#07074D]">
              Email
            </label>
            <a className="underline hover:text-red-500" href="/signup">Register</a>
            </div>
            <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              placeholder="example@abc.com"
              className="my-3 w-full border-none bg-transparent outline-none focus-within:ring-blue-400"
              />
              </div>
          </div>
        </div>
        <div className="mb-5">
          <label
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Password
          </label>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
          <input type="password" placeholder="*******"
                      className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
        </div>
        </div>
        <div className="pt-6">
          <Button label="Sign In"></Button>
        </div>
      </form>
      </div>
    </div>
  
  )
}
