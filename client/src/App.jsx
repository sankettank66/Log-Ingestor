import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Logs from './pages/Logs'

function App() {
  const PAGENOTFOUND = () => {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-6xl">404 Page not found</h1>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/logs' element={<Logs />} />
        <Route path='*' element={<PAGENOTFOUND />} />
      </Routes>
    </>
  );
}

export default App;