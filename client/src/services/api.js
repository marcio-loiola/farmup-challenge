import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Adjust this to your API's URL
});

export default api;
