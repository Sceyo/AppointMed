import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AboutUs from './components/AboutUs.jsx'
import LoginPage from './pages/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/AboutUs',
    element: <AboutUs/>
  }
  ]
  )



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} >
    
    <App />
    </RouterProvider>
    
  </React.StrictMode>,
)
