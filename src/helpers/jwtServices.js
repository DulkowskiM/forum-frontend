const jwtServices = {
  getAccessToken: () => {
    const localStorageAuth = window.localStorage.getItem('token-data');
    console.log(localStorageAuth);
    return localStorageAuth;
    //return localStorageAuth ? JSON.parse(localStorageAuth).token : '';
  },
};
