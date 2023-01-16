import React from 'react';
import { SignInPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import { HeartIcon, RejectIcon } from './components';
import { SignUpPage } from './pages/SignUpPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
      </Routes>
    </div>
  );
}

export default App;
