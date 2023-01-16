import React from 'react';
import { SignInPage } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path='/signin' element={<SignInPage />} />
      </Routes>
    </div>

  )
}

export default App;
