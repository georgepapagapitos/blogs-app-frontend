import { useState, useEffect } from 'react';

import Header from './components/Header';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import AddBlogForm from './components/AddBlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {

  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAllBlogs()
      .then(response => {
        setBlogs(response);
      });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setNotification({ text: 'Wrong credentials', type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    try {
      window.localStorage.removeItem('loggedInUser');
      setUser(null);
    } catch {
      setNotification({ text: 'Error logging out', type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url
    };

    blogService
      .addBlog(blogObject)
      .then(response => {
        setNotification({ text: `added ${response.title} by ${response.author}`, type: 'success' })
        setBlogs(blogs.concat(response));
        setTitle('');
        setAuthor('');
        setUrl('');
      })
      .catch(error => {
        setNotification({ text: 'error adding blog', type: 'error' });
      });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const deleteBlog = (id) => {
    blogService
      .deleteBlog(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id));
      })
      .catch(() => {
        setNotification({ text: 'error deleting note', type: 'error' });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
  };

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <Notification notification={notification} />
      {user === null &&
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      }
      {user !== null && <>
        <AddBlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} addBlog={addBlog} />
        <BlogList blogs={blogs} user={user} deleteBlog={deleteBlog} />
      </>}
    </div>
  );
};

export default App;
