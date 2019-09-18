import React, { useState, useEffect } from "react";
import Auth from "./Auth";

export const AuthContext = React.createContext();


const AuthProvider = ({ children, history }) => {
  const [auth0, setAuth0] = useState(null);

  useEffect(() => {
    setAuth0(new Auth(history))
  }, [history])
  return (
    <AuthContext.Provider value={{ auth0 }}>
       { children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
