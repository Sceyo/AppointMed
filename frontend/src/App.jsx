import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import CalendarPage from './pages/Calendar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<LoginPage />} >
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/calendar' element={<CalendarPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;