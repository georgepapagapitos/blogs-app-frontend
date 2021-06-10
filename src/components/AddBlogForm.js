const AddBlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, addBlog }) => (
  <form>
    <div>
      title
      <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
    </div>
    <div>
      author
      <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
    </div>
    <div>
      url
      <input type="text" value={url} name="URL" onChange={({ target }) => setUrl(target.value)} />
    </div>
    <div>
      <button onClick={addBlog}>add blog</button>
    </div>
  </form>
);

export default AddBlogForm;