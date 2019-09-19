import React from 'react'

import { Link } from "react-router-dom";
import useAuth from '../../Auth/useAuth';

const Navigation = () => {
  const {authenticated, login, logout} = useAuth();
  
  return (
    <div className="navbar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/public">Public</Link>
        {authenticated && <Link to="/private">Private</Link>}
        {authenticated && <Link to="/profile">Profile</Link>}
      </nav>
      <span className="buttons" >
        {!authenticated && <button onClick={login}>login</button>}
        {authenticated && <button onClick={logout}>logout</button>}
      </span>
    </div>
  )
}

export default Navigation
