export const login = (store) => ({
  type: 'LOGIN',
  payload: {
    store,
  },
});

export const logout = () => ({
  type: 'LOGOUT',
});
