const jwtServices = {
  getAccessToken: () => {
    const localStorageAuth = window.localStorage.getItem('token-data');
    console.log(JSON.parse(localStorageAuth));
    const tokenData = localStorage.getItem('token-data');
    console.log('token data', tokenData);
    return localStorageAuth ? JSON.parse(localStorageAuth).token : '';
  },
};
export default jwtServices;
