



const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return (
  <div>
    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' />
    <br />
    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...' />
  </div>)
