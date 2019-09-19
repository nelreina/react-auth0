import React from 'react'
import useAuth from '../Auth/useAuth'

const Profile = () => {
  const {profile} = useAuth()
  return (
    <div>
      <h3>Profile</h3>
      {profile ? <>
        <img src={profile.picture} alt=""/>
        <pre>
        {JSON.stringify(profile, null, 2)}
        </pre>
      </>
      :
      <p>Welcome Guest</p>  
    }
    </div>
  )
}

export default Profile
