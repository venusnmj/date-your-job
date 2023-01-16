import React from 'react'
import Button from '../Button'

export const EmployerForm = () => {
  return (
    <form action="https://formbold.com/s/FORM_ID" method="POST">
        <div className="flex flex-wrap">
          <div className="mb-5">
            <div className="justify-between">
            <label
              htmlFor="fName"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Company Name
            </label>
            <input
              type="text"
              name="company"
              id="company"
              placeholder="eg.abcd"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="lName"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Roles Available
            </label>
            <input
              type="text"
              name="job1"
              id="job1"
              placeholder="first"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
          <input
              type="text"
              name="job2"
              id="job2"
              placeholder="second"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
          <input
              type="text"
              name="job3"
              id="job3"
              placeholder="third"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <Button label = "Next"></Button>
                </div>
           </form>
  )
}
