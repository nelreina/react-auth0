import React from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Public from "./pages/Public";
import Callback from "./pages/Callback";
import Navigation from "./components/layout/Navigation";
import AuthProvider from "./Auth/AuthProvider";
import Private from "./pages/Private";

const App = ({ history }) => {
  return (
    <AuthProvider history={history}>
      <div className="App">
        <Navigation />
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/public" exact component={Public} />
          <Route path="/private" exact component={Private} />
          <Route path="/callback" exact component={Callback} />
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
