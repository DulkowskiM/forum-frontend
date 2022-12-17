import axios from 'axios';
import jwtServices from './helpers/jwtServices';
//const user = JSON.parse(window.localStorage.getItem('token-data')) ?? null;

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: { Authorization: 'Bearer ' + user.token },
});

export default instance;
