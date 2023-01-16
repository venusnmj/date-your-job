import React from 'react'
import { Button } from '..';

export const EmployeeForm = () => {
  return (
      <form action="https://formbold.com/s/FORM_ID" method="POST">
          <div className="mb-5">
            <div className="flex justify-between">
              <div>
            <label> First Name</label>
            <input
              type="text"
              name="fName"
              id="fName"
              placeholder="First Name"
              className="my-3 w-full border-none bg-transparent outline-none focus-within:ring-blue-400"
            />
            </div>
            <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lName"
              id="lName"
              placeholder="Last Name"
              className=" my-3 w-full border-none bg-transparent outline-none focus-within:ring-blue-400"
            />
          </div>
          </div>
          </div>
        
      <div className="font-bold mb-5">
        <label>
          TOP 3 Languages
        </label>
        <div className='p-3'>
        <select name="language1" id="language">
            <option value = "C">C</option> 
            <option value = "python">Python</option>
            <option value = "Java">Java</option>
        </select>
        <select name="language2" id="language">
            <option value = "C">C</option> 
            <option value = "python">Python</option>
        </select>
        <select name="language3" id="language">
            <option value = "C">C</option> 
        </select>
      </div>
      </div>

      <div className="font-bold mb-5">
            <label>Please describe about yourself</label>
            <textarea className='w-11/12 border'></textarea>
        </div>
      

      
      <div>
        <Button label="Next"/>
                </div>
           </form>
  )
}
