import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import "./MyImage.css"

function MyImage() {
  const {code} = useParams();
  const [url, setUrl] =  useState("");
  const [error, setError] = useState(null);

  const BACKEND_API = import.meta.env.VITE_BACKEND_API;

  axios.get(`${BACKEND_API}/api/v1/image/get/${code}`)
    .then(res => {
      console.log(res.data.url);
      setUrl(res.data.url);
    })
    .catch(err => {
      console.log(err);
      setError(err.response.data.message)
    }
  );
  
  return (
    <>
      {error && <p>{error}</p>}
      {!error &&
      <div className='image-container'>
        {url && <img src={url} className='my-image' alt="image" />}
        {!url && <p>Loading...</p>}
      </div>}
    </>

    // <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D" alt="image" />
  )
}

export default MyImage