import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState(null);
  const [logout, setLogout] = useState(null);
  const [profile, setProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const { auth0 } = context;
    const initAuth = async () => {
      if (auth0) {
        await auth0.loadProfile();
        setAuthenticated(auth0.isAuthenticated());
        setLogin(() => auth0.login);
        setLogout(() => auth0.logout);
        setProfile(auth0.profile);
        if (auth0.isAuthenticated()) {
          setAccessToken(auth0.accessToken);
        } else {
          setAccessToken(null);
        }
      }
    };
    initAuth();
  }, [context, context.auth0]);
  return { authenticated, login, logout, profile, accessToken };
};

export default useAuth;
