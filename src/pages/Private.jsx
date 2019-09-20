import React, {useState, useEffect} from 'react'
import useAuth from '../Auth/useAuth';

const Private = () => {
  const [message, setMessage] = useState("loading...");
  const {accessToken} = useAuth();
  useEffect(() => {
    const fetchMessage = async () => {
      const resp = await fetch("/private", {
        headers: {Authorization: `Bearer ${accessToken}`}
      });
      if (resp.ok) {
        const data = await resp.json();  
        setMessage(data.message);
      } else {
        setMessage("You are not authorized to view this content! :( ");
        
      }
    }
    fetchMessage();
  }, [accessToken])
  return (
    <div>
      {message}      
    </div>
  )
}

export default Private
