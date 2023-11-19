import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Logs from './pages/Logs'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/logs' element={<Logs />} />
      </Routes>
    </>
  );
}

export default App;