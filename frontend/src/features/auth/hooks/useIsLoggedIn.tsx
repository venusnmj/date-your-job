import { useFetch } from '../../../hooks';
import { useState } from 'react';
// import React from 'react';
import { useEffect } from 'react';

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [applicantId, setApplicantId] = useState(0);
  const [employerId, setEmployerId] = useState(0);
  const fetch = useFetch();

  useEffect(() => {
    fetch.get('/auth/profile').then(data => {
      // User is already signed in
      if (data) {
        setIsLoggedIn(true);
        setUserId(data.userId);
        setApplicantId(data.user.applicant?.applicantId);
        setEmployerId(data.user.employer?.employerId);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoggedIn, userId, applicantId, employerId };
};

export default useIsLoggedIn;
