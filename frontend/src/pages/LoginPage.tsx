import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { refreshUser } = useAuth()
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {


    e.preventDefault();


    const userData = {
      "email": email,
      "password": password
    }
    try {
      const response = await axios.post("http://localhost:8000/users/login", userData);

      const token = response.data.access_token;
      localStorage.setItem('token', token);
      await refreshUser()
      navigate('/home');
    }

    catch (error) {
      console.error("Login error: ", error);
      localStorage.clear();
    }

  }


  return (
    <div className='shadow-lg flex flex-col shadow-blue-500/50 w-96 h-auto bg-linear-to-bl from-indigo-900 to-sky-800 rounded-lg shadow-lg shadow-black/30 p-6 m-auto mt-20'>
      <span className='text-4xl m-4'>Log in</span>

      <form className='flex flex-col' onSubmit={handleLogin}>
        <div className='text-xl font-bold text-white text-center mb-6'>
          <input className='w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-blue-500 bg-gray-800/50 m-2 p-3 rounded' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' />
          <br />
          <input className='w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-blue-500 bg-gray-800/50 m-2 p-3 rounded' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...' />
        </div>
        <div className='flex flex-col items-center mt-4'>
          <input className='mr-auto w-full bg-blue-400 shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-colors rounded-lg font-semibold p-3 cursor-pointer' type='submit' value="Log in" />
          <span className='text-center p-4 w-20 text-white'>or</span>

          <Link to="/signup" className='!text-inherit text-center mr-auto w-full bg-green-500 shadow-md shadow-greeny-500/70 hover:bg-green-500/70 transition-colors rounded-lg font-semibold p-3 cursor-pointer'>Sign up</Link>
        </div>
      </form >

    </div >)
}


export default LoginPage;

