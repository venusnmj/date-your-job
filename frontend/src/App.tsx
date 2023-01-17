import React from 'react';
import { AppliedPage, SignInPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage';
import { SettingsPage } from './pages/SettingsPage';
import { Navbar, NavbarMobile } from './features';
import { SwipePage } from './pages/SwipePage';

function App() {

  return (
    <div className="min-h-screen bg-blue-500">
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/applied" element={<AppliedPage />}/>
        <Route path='/' element={<SwipePage />} />
      </Routes>
      <NavbarMobile />
    </div>
  );
}

export default App;
