import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {

  let blog;
  let user;
  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'www.blog.com',
      likes: 3,
      user: {
        username: 'blogtester1'
      }
    };
    user = {
      username: 'blogtester1',
      name: 'Blog Tester'
    };
    component = render(
      <Blog blog={blog} user={user} likeBlog={mockHandler} />
    );
  });

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    );
  });

  test('does not initially render url or likes', () => {
    expect(component.container).not.toHaveTextContent(
      `${blog.url}`
    );
    expect(component.container).not.toHaveTextContent(
      `${blog.likes}`
    );
  });

  test('displays url and likes once show details button is clicked', () => {
    const button = component.container.querySelector('.detailsButton');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(
      `${blog.url}`
    );
    expect(component.container).toHaveTextContent(
      `${blog.likes}`
    );
  });

  test('if the like button is clicked twice, the event handler component is called twice', () => {
    fireEvent.click(component.container.querySelector('.detailsButton'));
    const likeButton = component.container.querySelector('.like-button');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});