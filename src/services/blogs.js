import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAllBlogs = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const addBlog = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

const blogService = { getAllBlogs, setToken, addBlog };

export default blogService;