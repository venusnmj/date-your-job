import React, { useEffect, useState } from 'react';
import { useFetch } from './hooks';

function App() {
  // const fetch = useFetch();
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   fetch.get('/users/1').then(data => setUser(data));
  // }, [])

  return <div className="p-12 text-2xl text-red-500 hover:font-bold hover:text-3xl">
    Test
    {/* {user.name} */}
  </div>;
}

export default App;
