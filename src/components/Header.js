import React from 'react';

const Header = ({ user, handleLogout }) => (
  user === null ?
    <h1>log in to application</h1>
    :
    <>
      <h1>blogs</h1>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    </>

);

export default Header;