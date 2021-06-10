const Blog = ({ blog, deleteBlog }) => (
  <li>{blog.title} by {blog.author} <button onClick={() => deleteBlog(blog.id)}>delete</button></li>
);

export default Blog;