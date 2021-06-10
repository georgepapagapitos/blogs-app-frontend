const Blog = ({ blog, deleteBlog }) => (
  <li className='blog'>
    <a href={blog.url} target='_blank' rel='noreferrer'>{blog.title}</a> by {blog.author}
    <button onClick={() => deleteBlog(blog.id)}>delete</button>
  </li>
);

export default Blog;