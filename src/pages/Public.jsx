import React, {useState, useEffect} from 'react'

const Public = () => {
  const [message, setMessage] = useState("loading...");
  useEffect(() => {
    const fetchMessage = async () => {
      const resp = await fetch("/public");
      const data = await resp.json();

      setMessage(data.message);
    }
    fetchMessage();
  }, [])
  return (
    <div>
      {message}      
    </div>
  )
}

export default Public
