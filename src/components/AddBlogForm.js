const AddBlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, addBlog }) => (
  <form>
    <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
    <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
    <input type="text" value={url} name="URL" onChange={({ target }) => setUrl(target.value)} />
    <button onClick={addBlog}>add blog</button>
  </form>
);

export default AddBlogForm;