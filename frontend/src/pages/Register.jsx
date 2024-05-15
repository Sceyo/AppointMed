import { useState, useEffect } from 'react';
import ErrorMessage from '../common/ErrorMessage';
import { isValidEmail } from '../common/GlobalFunc';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleRegisterBtn = () => {
    const isEmpty = Object.values(formData).some((value) => value === '');

    if (isEmpty) {
      setError('Missing inputs on required fields!');
      setDisabled(true);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Email is not valid!');
      setDisabled(true);
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirm password do not match!');
      setDisabled(true);
      return;
    }
    
    console.log('Register them cuhh')
  };

  useEffect(() => {
    setError(null);
    setDisabled(false);
  }, [formData]);

  return (
    <div className='h-screen flex flex-row justify-center items-center bg-register-bg bg-cover'>
      <div className='w-2/6 p-20 flex flex-col bg-[#f2f2f2] justify-center items-center rounded-3xl bg-opacity-100'>
        <div className='flex justify-center py-2'>
          <h1 className='text-5xl font-bold tracking-wide'>
            appoint
            <span className='font-extrabold text-red-400 pl-0.5'>Med</span>
          </h1>
        </div>
        <div className='py-2 pt-4 pl-2 self-start'>
          <h1 className='font-normal text-3xl'>Register</h1>
        </div>
        <div className='w-full py-2 items-center'>
          <div className='pl-2'>
            <ErrorMessage message={error} />
          </div>
          <input
            placeholder='Name'
            type='text'
            value={formData.name}
            onChange={(event) =>
              setFormData({...formData, name: event.target.value})
            }
            className='w-full my-2 p-3 rounded-3xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wider focus:outline-red-300'
          />
          <input
            placeholder='Email'
            type='email'
            value={formData.email}
            onChange={(event) =>
              setFormData({...formData, email: event.target.value})
            }
            className='w-full my-2 p-3 rounded-3xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wider focus:outline-red-300'
          />
          <input
            placeholder='Password'
            type='password'
            value={formData.password}
            onChange={(event) =>
              setFormData({...formData, password: event.target.value})
            }
            className='w-full my-2 p-3 rounded-3xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wider focus:outline-red-300'
          />
          <input
            placeholder='Confirm Password'
            type='password'
            value={formData.confirmPassword}
            onChange={(event) =>
              setFormData({...formData, confirmPassword: event.target.value})
            }
            className='w-full my-2 p-3 rounded-3xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wider focus:outline-red-300'
          />
          <button
            onClick={handleRegisterBtn}
            disabled={disabled}
            className='w-full my-3 p-2.5 text-xl text-white font-extrabold tracking-widest border-red-500 bg-red-400 disabled:hover:transition-none disabled:bg-slate-500 disabled:hover:drop-shadow-none disabled:bg-opacity-50 active:bg-red-300 active:transition-colors active:duration-75 active:ease-in-out hover:drop-shadow-lg transition rounded-full'
          >
            SIGN UP
          </button>
          <div className='text-center opacity-50 pt-1'>
            <a href='/' className='text-right'>
              Already have an account? Log in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
