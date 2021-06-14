const BlogDetails = ({ blog }) => (
  <>
    <p>{blog.title} by {blog.author}</p>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
    <p>{blog.user}</p>
  </>
);

export default BlogDetails;
