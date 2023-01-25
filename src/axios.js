import axios from 'axios';
import jwtServices from './helpers/jwtServices';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token-data');
  console.log(token);
  if (token) {
    config.headers.authorization = 'Bearer ' + jwtServices.getAccessToken();
  }
  return config;
});
// headers: {
//   Authorization: 'Bearer ' + user.token,
//   Accept: 'application/json',
// },
export default instance;
