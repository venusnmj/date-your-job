import React from 'react';
import { SignInPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage';
import { SettingsPage } from './pages/SettingsPage';
import { Navbar } from './features';

function App() {
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
      </Routes>
    </div>
  );
}

export default App;
