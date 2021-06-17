import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, deleteBlog, likeBlog, user }) => {
  return (
    <div>
      <ul>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} user={user} blog={blog} deleteBlog={deleteBlog} likeBlog={likeBlog} />)}
      </ul>
    </div>
  );
};

export default BlogList;