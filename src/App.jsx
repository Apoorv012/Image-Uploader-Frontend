import './App.css'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function App() {
  const hiddenFileUploadRef = useRef(null);
  const [filename, setFilename] = useState('');
  const [fileURL, setFileURL] = useState('');

  const handleFileUpload = (f) => {
    try {
      console.log("file uploaded");
      const file = f.target.files[0];
      setFilename(file.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadButtonClicked = () => {
    hiddenFileUploadRef.current.click();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    const file = hiddenFileUploadRef.current.files[0];
    console.log(file);

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const baseApiUrl = import.meta.env.VITE_BACKEND_API;
    const formData = new FormData();
    
    formData.append('image', file);
    axios.post(`${baseApiUrl}/api/v1/image/upload`, formData)
      .then(res => {
        console.log(res);

        const currentURL = window.location.href;

        setFileURL(`${currentURL}image/${res.data.code}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCopyURLClick = () => {
    console.log("copy url clicked");
    navigator.clipboard.writeText(fileURL);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='logo-container'>
          <img className='logo' src="/upload.svg" alt="upload_img" />
          <h1 className='logo-text'>Image Uploader</h1>
        </div>
        {/* <div>
          <button className='btn login-btn'>Log In</button>
          <button className='btn signup-btn'>Sign Up</button>
        </div> */}
      </nav>
      <main>
        <h1 className='main-text'>Upload and share images</h1>
        <div className='mid-line'>
          <h3>Max size : 32 MB</h3>
          <h3>File Type: JPEG, PNG, GIF, etc.</h3>
        </div>
        <form id='upload-form' onSubmit={(e) => e.preventDefault()}>
          <div className='upload-btn-container'>
            <input type="file" accept='image/*' style={{ display: 'none' }} name='image'
              onChange={handleFileUpload} id='file-upload' ref={hiddenFileUploadRef} />
            <label htmlFor='file-upload'>
              <button className='btn upload-btn' onClick={handleUploadButtonClicked}>
                Choose a file
              </button>
            </label>
          </div>
        <p style={{ textAlign: 'center', paddingTop: 10, height: 20 }}>{filename}</p>
        {/* <p style={{ textAlign: 'center', padding: 30 }}>For custom URL, please login first.</p> */}
          <button style={{ display: "block", marginInline: "auto", marginBlock: 20, padding: 5 }} type="submit" onClick={handleFormSubmit}>Upload Image</button>
        </form>

        {fileURL && <div className="copy-container">
          <div className='copy-content'>
            <p id="text-to-copy">{fileURL}</p>
            <button className='copy-btn' onClick={handleCopyURLClick}>
              <img className='copysvg' src="/copy.svg" alt="copy_img" />
            </button>
          </div>
        </div>}
      </main>
      <footer>
        <p>Apoorv Mittal © 2024</p>
      </footer>
    </>
  )
}

export default App
