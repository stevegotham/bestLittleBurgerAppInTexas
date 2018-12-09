import  axios from 'axios';

const instance = axios.create({
  baseURL: 'https://best-little-burger-backend.firebaseio.com/'
});

export default instance;
