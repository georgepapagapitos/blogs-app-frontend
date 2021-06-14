import { useState } from 'react';

const AddBlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog({
      title,
      author,
      url
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <button>add blog</button>
      </div>
    </form>
  )
};

export default AddBlogForm;