import Blog from './Blog';

const BlogList = ({ blogs, user, handleLogout }) => (
  <div>
    <h1>blogs</h1>
    <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    <ul>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </ul>
  </div>
);

export default BlogList;