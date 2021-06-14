import { useState, useEffect, useRef } from 'react';

import Header from './components/Header';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import AddBlogForm from './components/AddBlogForm';
import Toggle from './components/Toggle';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {

  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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

  const login = async (username, password) => {
    try {
      const user = await loginService.login(
        { username, password }
      );
      blogService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );
      setUser(user);
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .addBlog(blogObject)
      .then(response => {
        setNotification({ text: `added ${response.title} by ${response.author}`, type: 'success' })
        setBlogs(blogs.concat(response));
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
        setNotification({ text: 'deleted blog', type: 'success' });
      })
      .catch(() => {
        setNotification({ text: 'error deleting note', type: 'error' });
      })
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const loginForm = () => (
    <Toggle buttonLabel="log in">
      <LoginForm login={login} />
    </Toggle>
  )

  const blogFormRef = useRef();

  const addBlogForm = () => (
    <Toggle buttonLabel="add a blog" ref={blogFormRef}>
      <AddBlogForm addBlog={addBlog} />
    </Toggle>
  )

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <Notification notification={notification} />
      {user === null &&
        loginForm()
      }
      {user !== null && <>
        {addBlogForm()}
        <BlogList blogs={blogs} user={user} deleteBlog={deleteBlog} />
      </>}
    </div>
  );
};

export default App;
