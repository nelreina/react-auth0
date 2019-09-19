import React, { useEffect, useContext } from "react";
import { AuthContext } from '../Auth/AuthProvider'

const Callback = ({ location }) => {
  const context = useContext(AuthContext)
  useEffect(() => {
    if (/access_token|id_token|error/.test(location.hash)) {
      context.auth0 && context.auth0.handleAuthentication()
    } else {
      console.log("Invalid callback!")
    }
  }, [context.auth0, location.hash]);
  return <h1>Loading...</h1>;
};

export default Callback;
