import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './components/Layout'
import AboutUs from './components/AboutUs'
import LoginPage from './pages/Login';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
