import { useFetch } from '../../../hooks';
import { useState } from 'react';
// import React from 'react';
import { useEffect } from 'react';

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetch = useFetch();

  useEffect(() => {
    fetch.get('/auth/profile').then(data => {
      // User is already signed in
      if (data) setIsLoggedIn(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoggedIn };
};

export default useIsLoggedIn;
