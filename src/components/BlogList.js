import Blog from './Blog';

const BlogList = ({ blogs, deleteBlog, likeBlog }) => {

  return (
    <div>
      <ul>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} likeBlog={likeBlog} />)}
      </ul>
    </div>
  );
};

export default BlogList;