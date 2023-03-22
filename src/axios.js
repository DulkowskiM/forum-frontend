import axios from 'axios';
import jwtServices from './helpers/jwtServices';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token-data');
  // console.log(token);
  if (token) {
    config.headers.authorization = 'Bearer ' + jwtServices.getAccessToken();
  }
  return config;
});
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    console.log(config.url);
    const refreshUrl = 'http://localhost:8000/api/refresh';
    if (error?.response?.status === 500 && config.url !== refreshUrl) {
      config.sent = true;

      const result = await instance.post('http://localhost:8000/api/refresh', {
        token: jwtServices.getAccessToken(),
      });
      if (result?.data) {
        const data = result.data;
        const authData = {
          id: data.user.id,
          email: data.user.email,
          token: data.authorisation.token,
          isAuthenticated: true,
          isAdmin: data.user.is_admin,
          name: data.user.name,
        };
        // console.log(authData);
        // authContext.dispatch(login(authData));
        window.localStorage.setItem('token-data', JSON.stringify(authData));
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${authData.token}`,
        };
      }
      return instance(config);
    }
    return Promise.reject(error);
  },
);
export default instance;
