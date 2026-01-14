import { useState } from 'react'
import axios from 'axios'



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post("http://localhost:8000/users/login", formData);

      const token = response.data.access_token;
      localStorage.setItem('token', token);
      console.log(response.data + " Successfully loged in");
    }

    catch (error) {
      console.error("Login error: ", error);
    }

  }



  return (
    <div>
      <form onSubmit={handleLogin}>      <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' />
        <br />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...' />
        <button type='submit' />
      </form>

    </div>)
}


export default LoginPage;
