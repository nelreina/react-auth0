import React from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navigation from "./components/layout/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
      </main>
    </div>
  );
}

export default App;
