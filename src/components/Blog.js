import React, { useState } from 'react';

const Blog = ({ blog, deleteBlog, likeBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const handleLike = async event => {
    event.preventDefault();
    const likes = blog.likes + 1;
    const newBlog = { ...blog, likes };
    await likeBlog(blog.id, newBlog);
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} by {blog.author} <button className="detailsButton" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails &&
        <>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} <button className="likeButton" onClick={handleLike}>like</button>
          </div>
          <div>
            Posted by {blog.user.name}
          </div>
          {blog.user.username === user.username && <button className="deleteButton" onClick={() => deleteBlog(blog)}>delete</button>}
        </>
      }
    </div>
  );
};

export default Blog;