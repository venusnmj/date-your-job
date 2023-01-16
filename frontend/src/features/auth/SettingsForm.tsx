
import React, { useEffect, useState } from 'react'
import { Button } from '../../components';
import { EmployeeForm, EmployerForm } from '../../components/forms';
export const SettingsForm = () => {
  const [selectedRole, setSelectedRole] = useState<'applicant' | 'employer'>();

  return (
    <div className="bg-blue-500 flex items-center justify-center p-12 h-screen">
      <div className="bg-white p-12 border-solid border-2 border-gray-500 ">
        {/* Buttons to select role */}
        <label>Are you a Applicant or Employer</label>
        <div className="flex flex-wrap mb-5">
          <div className="flex flex-row justify-between gap-12">
            <div 
              className="cursor-pointer font-bold hover:text-amber-400"
              onClick={() => setSelectedRole('applicant')}
            >
              Applicant
            </div>
            <div
              className="cursor-pointer font-bold hover:text-amber-400"
              onClick={() => setSelectedRole('employer')}
            >
              Employer
            </div>
          </div>
        </div>

        {/* Form */}
        {selectedRole === 'applicant' ?
          <EmployeeForm /> :
          <EmployerForm />}
      </div>
    </div>
  )

}
