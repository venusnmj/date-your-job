import React from 'react'
import { Button } from '../../components'

export const SignInForm = () => {
  return (
    <div>
      <Button label="Register"></Button>
      <div className="flex items-center justify-center p-12">
        <form action="https://formbold.com/s/FORM_ID" method="POST">
          <div className="flex flex-wrap">
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                />
            </div>
          </div>
          <div className="mb-5">
            <label
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <Button label="Submit"></Button>
          </div>
        </form>
      </div>
      {/* {user.name} */}
    </div>
  )
}
