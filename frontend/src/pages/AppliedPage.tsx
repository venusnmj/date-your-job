import React, { useEffect, useState } from 'react';
import useIsLoggedIn from '../features/auth/hooks/useIsLoggedIn';
import { useFetch } from '../hooks';

interface ApplicantsCardProps {
  applicantId: number;
  applications: Array<{
    status: string;
    createdAt: Date;
    employerListing: {
      title: string;
      description: string;
      salary: string;
      location: string;
      jobType: string;
      image: string;
    };
  }>
}

export const ApplicantsCard = (props: ApplicantsCardProps) => {
  const { applications } = props;

  
  return (
    <div className="w-full flex flex-col gap-4">
      {
      applications?.map(application => (
          <a key={application.employerListing.title} href={`/${application.employerListing.image}`} target="_blank" rel="noopener noreferrer">
            <div
              id="card"
              className="group/card border border-white rounded-lg border-dashed border-2 border-green-500 min-h-[12rem] max-w-[22rem] h-full sm:w-full p-4 opacity-50 hover:opacity-100 hover:scale-105 hover:border-solid duration-100 cursor-pointer"
            >
              <div
                id="card-title"
                className="text-lg mb-2 group-hover/card:font-bold"
              >
                {application.employerListing.title}&nbsp;
                {application.employerListing.jobType && <span className="text-xs">({application.employerListing.jobType})</span>}
              </div>
              <div
                id="card-body"
                className="text-gray-400 group-hover/card:text-white"
              >
                {application.employerListing.description}
              </div>
            </div>
          </a>
        )
      )}
    </div>
  );
};

export const AppliedPage = () => {
  const fetch = useFetch();
  const { applicantId } = useIsLoggedIn();
  const [applicant, setApplicant] = useState<any>()

  useEffect(() => {
    fetch.get(`/applicants/${applicantId}`)
      .then((data) => setApplicant(data))
      .catch(e => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicantId]);

  return (
    <div id="page-container" className="w-full h-screen flex flex-col gap-12 justify-center items-center">
      {/* Page Title */}
      <div className="text-4xl">
        Applied Positions
      </div>

      {/* Applied Jobs Cards */}
      <div className="flex flex-col justify-center items-center">
        {<ApplicantsCard applicantId={applicant?.applicantId} applications={applicant?.applications} />}
      </div>
    </div>
  )
}
