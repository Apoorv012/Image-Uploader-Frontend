import './App.css'
import { useState, useRef } from 'react';

function App() {
  const hiddenFileUpload = useRef(null);
  const [filename, setFilename] = useState('');

  const handleFileUpload = (f) => {
    console.log("file uploaded");
    setFilename(f.target.files[0].name)
  };

  const handleUploadButtonClicked = () => {
    hiddenFileUpload.current.click();
  };

  return (
    <>
      <nav className='navbar'>
        <div className='logo-container'>
          <img className='logo' src="/upload.svg" alt="upload_img" />
          <h1 className='logo-text'>Image Uploader</h1>
        </div>
        <div>
          <button className='btn login-btn'>Log In</button>
          <button className='btn signup-btn'>Sign Up</button>
        </div>
      </nav>
      <main>
        <h1 className='main-text'>Upload and share images</h1>
        <div className='mid-line'>
          <h3>Max size : 32 MB</h3>
          <h3>File Type: JPEG, PNG, GIF, etc.</h3>
        </div>
        <div className='upload-btn-container'>
          <input type="file" accept='image/*' style={{ display: 'none' }}
            onChange={handleFileUpload} id='file-upload' ref={hiddenFileUpload} />
          <label htmlFor='file-upload'>
            <button className='btn upload-btn' onClick={handleUploadButtonClicked}>
              Choose a file
            </button>
          </label>
        </div>
        <p style={{ textAlign: 'center', paddingTop: 10, height: 20 }}>{filename}</p>
        <p style={{ textAlign: 'center', padding: 30 }}>For custom URL, please login first.</p>
      </main>
      <footer>
        <p>Apoorv Mittal © 2024</p>
      </footer>
    </>
  )
}

export default App
