import React, {useContext} from 'react'
import { AuthContext } from '../Auth/AuthProvider'

const Home = () => {
  const context = useContext(AuthContext);
  const login = () => {
    context.auth0.login()
  }
  return (
    <div>
      <h3>Home</h3>
      <button onClick={login} >Login</button>
    </div>
  )
}

export default Home
