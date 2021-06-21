import React, { useState, useEffect, useRef } from 'react';

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
    } catch (err) {
      setNotification({ text: 'Wrong credentials', type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedInUser');
      setUser(null);
    } catch (err) {
      setNotification({ text: 'Error logging out', type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .addBlog(blogObject)
      .then(response => {
        setNotification({ text: `added ${response.title} by ${response.author}`, type: 'success' });
        setBlogs(blogs.concat(response));
      })
      .catch(() => {
        setNotification({ text: 'error adding blog', type: 'error' });
      });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const deleteBlog = (blogObject) => {
    if (window.confirm(`do you want to delete ${blogObject.title}`)) {
      blogService
        .deleteBlog(blogObject.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== blogObject.id));
          setNotification({ text: 'deleted blog', type: 'success' });
        })
        .catch(() => {
          setNotification({ text: 'error deleting blog', type: 'error' });
        });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Toggle buttonLabel="log in">
      <LoginForm login={login} />
    </Toggle>
  );

  const blogFormRef = useRef();

  const addBlogForm = () => (
    <Toggle buttonLabel="add a blog" ref={blogFormRef}>
      <AddBlogForm addBlog={addBlog} />
    </Toggle>
  );

  const likeBlog = (id, blogObject) => {
    blogService
      .likeBlog(id, blogObject)
      .then(() => {
        setBlogs(blogs.map(blog => blog.id === blogObject.id ? blogObject : blog));
      })
      .catch(() => {
        setNotification({ text: 'error liking blog', type: 'error' });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <Notification notification={notification} />
      {user === null &&
        loginForm()
      }
      {user !== null && <>
        {addBlogForm()}
        <BlogList user={user} blogs={blogs} deleteBlog={deleteBlog} likeBlog={likeBlog} />
      </>}
    </div>
  );
};

export default App;
