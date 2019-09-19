import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.profile = null;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    this.removeSession();
    this.profile = null;
    this.history.push("/");
  };

  removeSession = () => {
    window.localStorage.removeItem("expires-at");
    window.localStorage.removeItem("access-token");
    window.localStorage.removeItem("id-token");
  };

  setSession = authResult => {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    window.localStorage.setItem("expires-at", JSON.stringify(expiresAt));
    window.localStorage.setItem(
      "access-token",
      JSON.stringify(authResult.accessToken)
    );
    window.localStorage.setItem("id-token", JSON.stringify(authResult.idToken));
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.loadProfile(authResult.accessToken);
        this.history.push("/");
      } else {
        this.history.push("/");
        console.log(err);
      }
    });
  };

  isAuthenticated = () => {
    const expiresAt = JSON.parse(window.localStorage.getItem("expires-at"));
    return new Date().getTime() < expiresAt;
  };

  loadProfile = async accessToken => {
    let _token, profile;
    if (!this.profile) {
      if (!accessToken) {
        _token = JSON.parse(window.localStorage.getItem("access-token"));
        // if (!_token) return alert("no token available");
      } else {
        _token = accessToken;
      }
      try {
        profile = await this.getClientInfo(_token);
      } catch (error) {
        console.log("error :", error);
        profile = null;
      }
      this.profile = profile;
    } else {
      profile = this.profile;
    }
    return profile;
  };

  getClientInfo = accessToken =>
    new Promise((resolve, reject) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) return reject(err);
        return resolve(profile);
      });
    });
}
