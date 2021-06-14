import { useState } from 'react';

const Blog = ({ blog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} by {blog.author} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails &&
        <>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} <button>like</button>
          </div>
          <div>
            Posted by {blog.user.name}
          </div>
          <button onClick={() => deleteBlog(blog.id)}>delete</button>
        </>
      }
    </div>
  );
};

export default Blog;