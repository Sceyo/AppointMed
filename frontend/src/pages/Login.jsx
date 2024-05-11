import { useState } from 'react';
import '../App.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
  };

  return (
    <div className='h-screen flex flex-row'>
      <div className='w-2/5 flex flex-col p-20 content-center justify-center bg-[#f2f2f2]'>
        <div className='flex flex-col items-center py-8'>
          <h1 className='text-6xl font-bold tracking-wide pb-1'>
            appoint
            <span className='font-extrabold text-red-400 pl-0.5'>Med</span>
          </h1>
          <h2 className='text-lg'>
            Your <span className='text-red-400 font-bold'>appointment</span> web
            companion!
          </h2>
        </div>
        <div className='py-2'>
          <h1 className='font-normal text-3xl pl-2'>Login</h1>
        </div>
        <div className='flex flex-col py-2 justify-center items-center'>
          <input
            placeholder='Email'
            type='email'
            className='w-full my-2 p-3 rounded-3xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wide focus:outline-red-400'
          />
          <input
            placeholder='Password'
            type='password'
            className='w-full my-2 p-3 rounded-3xl border-solid border-2 border-black border-opacity-10 text-lg tracking-wide focus:outline-red-300'
          />
          <div className='self-end opacity-50 pb-1'>
            <a className='text-right'>Forgot your password?</a>
          </div>
          <button className='w-full my-2 p-2.5 text-xl text-white font-extrabold tracking-widest border-red-500 bg-red-400 active:bg-red-300 active:transition-colors active:duration-75 active:ease-in-out hover:border-red-300 hover:drop-shadow-lg transition border-1 rounded-full'>
            LOG IN
          </button>
          <div className='opacity-50 pt-1'>
            <a className='text-right'>Don&apos;t have an account? Register here</a>
          </div>
        </div>
      </div>
      <div className='w-3/5 bg-login-bg bg-cover bg-right'></div>
    </div>
  );
}
