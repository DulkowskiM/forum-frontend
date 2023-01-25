const localStorageUser = window.localStorage.getItem('token-data');
export const initialState = localStorageUser
  ? { ...JSON.parse(localStorageUser) }
  : {
      user: {
        email: '',
        id: '',
      },
      accessToken: '',
      //   refreshToken: '',
      isAuthenticated: false,
    };
export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const accessToken = action.payload.store.accessToken;
      //   const refreshToken = action.payload.store.refreshToken;
      const user = action.payload.store.user;
      const isAuthenticated = true;

      //   return { ...state, user, accessToken, refreshToken,isAuthenticated };
      return { ...state, user, accessToken, isAuthenticated };
    case 'LOGOUT':
      return {
        ...state,
        user: { id: '', email: '' },
        accessToken: null,
        // refreshToken: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
