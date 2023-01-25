import React from 'react';

const AuthContext = React.createContext({
  state: {},
  login: () => {},
  logout: () => {},
});

AuthContext.displayName = 'AuthContext';

export default AuthContext;
