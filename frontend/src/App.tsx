import React from 'react';
import { SignInPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import { HeartIcon, RejectIcon } from './components';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path='/signin' element={<SignInPage />} />
      </Routes>
      <HeartIcon></HeartIcon>
      <RejectIcon></RejectIcon>
    </div>

  )
}

export default App;
