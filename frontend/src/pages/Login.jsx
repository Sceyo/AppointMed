import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../common/ErrorMessage';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import UserContext from '../contexts/UserContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { updateUser } = useContext(UserContext);

  const handleLoginBtn = async () => {
    const isEmpty = Object.values(formData).some(x => x === '');
    if (isEmpty) {
      setError('Missing inputs on required fields!');
      setDisabled(true);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3001/auth/login', formData);
      if (response.data.message === 'Login successful') {
        login(response.data.token); // Use context to set token
        const getUser = await axios.get('http://127.0.0.1:3001/auth/status', {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      });

      updateUser(getUser.data.user);

      if (getUser.data.user && getUser.data.user.name) {
        console.log(`Fetched user: ${getUser.data.user.name} (${getUser.data.user.email}) id:${getUser.data.user.id}`); // Debug log
      }

      navigate('/dashboard'); // Redirect to dashboard

      }
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Login failed');
      setDisabled(false);
    }
  };

  useEffect(() => {
    setError(null);
    setDisabled(false);
  }, [formData]);

  return (
    <div className='h-screen flex flex-row'>
      <div className='w-2/5 flex flex-col p-20 content-center justify-center bg-[#f2f2f2]'>
        <div className='flex flex-col items-center py-8'>
          <h1 className='text-6xl font-bold tracking-wide pb-1'>
            appoint
            <span className='font-extrabold text-red-400 pl-0.5'>Med</span>
          </h1>
          <h2 className='text-lg'>
            Your <span className='text-red-400 font-bold'>appointment</span> web companion!
          </h2>
        </div>
        <div className='py-2'>
          <h1 className='font-normal text-3xl pl-2'>Login</h1>
        </div>
        <div className='flex flex-col py-2 justify-center items-center'>
          <div className='self-start pl-2'>
            <ErrorMessage message={error} />
          </div>
          <input
            placeholder='Email'
            type='email'
            name="email"
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl drop-shadow-md border-solid border-2 border-black border-opacity-10 text-lg tracking-wide focus:outline-red-300'
          />
          <input
            placeholder='Password'
            type='password'
            name="password"
            value={formData.password}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
            className='w-full my-2 p-3 rounded-2xl drop-shadow-md border-solid border-2 border-black border-opacity-10 text-lg tracking-wide focus:outline-red-300'
          />
          <div className='self-end opacity-50 pb-1'>
            <a
              className='text-right hover:text-secondary hover:duration-150'
              href='/forgot-password'
            >
              Forgot your password?
            </a>
          </div>
          <button
            onClick={handleLoginBtn}
            disabled={disabled}
            className='w-full my-3 p-2.5 text-xl text-white font-extrabold tracking-widest border-red-500 bg-red-400 disabled:hover:transition-none disabled:bg-slate-500 disabled:hover:drop-shadow-none disabled:bg-opacity-50 active:bg-red-300 active:transition-colors active:duration-75 active:ease-in-out hover:drop-shadow-lg hover:bg-secondary hover:duration-150 transition rounded-full'
          >
            LOG IN
          </button>
          <div className='opacity-50 pt-1'>
            <a
              href='/register'
              className='text-right hover:text-secondary hover:duration-150'
            >
              Don&apos;t have an account? Register here
            </a>
          </div>
        </div>
      </div>
      {/* Background */}
      <div className='w-3/5 bg-login-bg bg-cover bg-right'></div>
    </div>
  );
}
