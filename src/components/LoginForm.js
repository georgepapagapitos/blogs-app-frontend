const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <>
    <h1>log in to application</h1>
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
  </>
);

export default LoginForm
