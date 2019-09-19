import React from 'react'
import useAuth from '../Auth/useAuth'
import {Link} from 'react-router-dom';

const Home = () => {
  const {authenticated} = useAuth();
  return (
    <div>
      <h3>Home</h3>
      {
        authenticated ? <Link to="/profile" >View Profile</Link> :
        <p>Please login to access your data</p>
      }
    </div>
  )
}

export default Home
