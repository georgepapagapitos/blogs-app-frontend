import Blog from './Blog';

const BlogList = ({ blogs, user, handleLogout }) => (
  <div>
    <ul>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </ul>
  </div>
);

export default BlogList;