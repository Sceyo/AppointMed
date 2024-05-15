import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<LoginPage />} >
              <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;