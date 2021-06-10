import Blog from './Blog';

const BlogList = ({ blogs, deleteBlog }) => (
  <div>
    <ul>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />)}
    </ul>
  </div>
);

export default BlogList;