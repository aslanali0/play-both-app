import { useState } from 'react'
import axios from 'axios'



const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const userData = {
      "username": username,
      "email": email,
      "password": password
    }
    try {
      const response = await axios.post("http://localhost:8000/users/register", userData);

      console.log(response.data + " Successfully registered");
    }

    catch (error) {
      console.error("Signup error: ", error);
    }

  }


  return (
    <div className='w-96 h-auto bg-linear-to-bl from-indigo-900 to-sky-800 rounded-lg shadow-lg shadow-black/30 p-6 m-auto mt-20'>
      <form className='flex flex-col' onSubmit={handleSignup}>
        <div className='text-xl font-bold text-white text-center mb-6'>
          <input className='w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-blue-500 bg-gray-800/50 m-2 p-3 rounded' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' />
          <br />
          <input className='w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-blue-500 bg-gray-800/50 m-2 p-3 rounded' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...' />
        </div>
        <div className='flex items-center mt-4'>
          <input className='mr-auto w-30 bg-blue-400 shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-colors rounded-lg font-semibold p-3 cursor-pointer' type='submit' value="Log in" />
          <span className='w-20 text-white'>or</span>
          <input className='mr-auto w-30 bg-green-200 shadow-md shadow-green-500/20 hover:bg-green-500 transition-colors rounded-lg font-semibold p-3 cursor-pointer' type='submit' value="Sign up" />
        </div>
      </form >

    </div >)
}


export default SignUpPage;
