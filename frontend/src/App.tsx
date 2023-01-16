import React from 'react';
import { SignInPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage';
import { NotifPage } from './pages/NotifPage';

function App() {
  
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />}/>
      </Routes>
      <Routes>
        <Route path="/home" element={<NotifPage />} />
      </Routes>
    </div>
  );
}

export default App;
