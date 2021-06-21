import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddBlogForm from './AddBlogForm';

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn();

  const component = render(
    <AddBlogForm addBlog={addBlog} />
  );

  const titleInput = component.container.querySelector('#title');
  const authorInput = component.container.querySelector('#author');
  const urlInput = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: 'test title' }
  });
  fireEvent.change(authorInput, {
    target: { value: 'test author' }
  });
  fireEvent.change(urlInput, {
    target: { value: 'test url' }
  });
  fireEvent.submit(form);


  console.log(addBlog.mock.calls[0][0]);
  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'test title',
    author: 'test author',
    url: 'test url'
  });
});