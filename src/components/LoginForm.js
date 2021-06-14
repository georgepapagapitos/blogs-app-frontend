import { useState } from 'react';

const LoginForm = ({ login }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    login({ username, password })
      .then(() => {
        console.log('log in successful');
        setUsername('');
      })
      .catch((err) => {
        console.error(err);
      });
    setPassword('');
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button>login</button>
    </form>
  )
};

export default LoginForm
