import './App.css'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const hiddenFileUploadRef = useRef(null);
  const uploadButtonRef = useRef(null);
  const [filename, setFilename] = useState('');
  const [fileURL, setFileURL] = useState('');
  const [fileServerURL, setFileServerURL] = useState('');

  const handleFileUpload = (f) => {
    try {
      const file = f.target.files[0];
      console.log("file uploaded", file.size);
      if (file.size > 10485760) {
        toast("File too large. Please upload a file less than 10 MB", { type: 'error' });
        setFileURL('');
        hiddenFileUploadRef.current.value = '';
        return;
      }
      setFilename(file.name);
      setFileURL('');
      } catch (error) {
        console.log(error);
        setFileURL('');
    }
  };

  const handleUploadButtonClicked = () => {
    hiddenFileUploadRef.current.click();
  };

  const handleFormSubmit = (e) => {
    // disable uploadButtonRef
    uploadButtonRef.current.disabled = true;

    e.preventDefault();
    console.log("form submitted");
    const file = hiddenFileUploadRef.current.files[0];
    console.log(file);

    if (!file) {
      toast("Please select a file to upload", { type: 'warning' });
      uploadButtonRef.current.disabled = false;
      return;
    }

    const baseApiUrl = import.meta.env.VITE_BACKEND_API;
    const formData = new FormData();
    
    formData.append('image', file);

    const toastId = toast.loading("Please wait...");
    axios.post(`${baseApiUrl}/api/v1/image/upload`, formData)
      .then(res => {
        console.log(res);

        const currentURL = window.location.href;

        setFileURL(`${currentURL}image/${res.data.code}`);
        setFileServerURL(res.data.url);
        toast.update(toastId, { render: "Image uploaded succesfully!", type: "success", isLoading: false, autoClose: 4000 });
        uploadButtonRef.current.disabled = false;
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          // toast("Network Error. Please try again later", { type: 'error' });
          toast.update(toastId, {render: "Network Error. Please try again later", type: "error", isLoading: false, autoClose: 4000 });
          uploadButtonRef.current.disabled = false;
          return;
        }

        console.log("err", err);
        // console.error(`${err.response.data.message} : ${err.response.data.error}`);

        if (err.response.data.error) {
          if (err.response.data.error.startsWith("File size too large")) {
            // toast("File too large. Please upload a file less than 10 MB", { type: 'error' });
            toast.update(toastId, {render: "File too large. Please upload a file less than 10 MB", type: "error", isLoading: false, autoClose: 4000 });
            uploadButtonRef.current.disabled = false;
            return;
          }

          toast.update(toastId, {render: err.response.data.error, type: "error", isLoading: false, autoClose: 4000 });
          uploadButtonRef.current.disabled = false;
          return;
        }

        toast.dismiss(toastId);
        toast("An error occurred. Please try again later", { type: 'error' });
        
        setFileURL('');
        uploadButtonRef.current.disabled = false;
    });
  };

  const handleCopyURLClick = () => {
    console.log("copy url clicked");
    toast("URL copied to clipboard", { type: 'success' });
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
        <ToastContainer />
        <h1 className='main-text'>Upload and share images</h1>
        <div className='mid-line'>
          <h3>Max size : 10 MB</h3>
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
          <button style={{ display: "block", marginInline: "auto", marginBlock: 20, padding: 5 }} type="submit" onClick={handleFormSubmit} ref={uploadButtonRef}>Upload Image</button>
        </form>

        {fileURL && <div className="copy-container">
          <div className='copy-content'>
            <p id="text-to-copy">{fileURL}</p>
            <button className='copy-btn' onClick={handleCopyURLClick}>
              <img className='copysvg' src="/copy.svg" alt="copy_img" />
            </button>
          </div>
          <img style={{maxHeight: 100, maxWidth: 200, marginLeft: 10, borderRadius: 5}} src={fileServerURL} alt="uploaded_img" />
        </div>}
      </main>
      <footer>
        <p>Apoorv Mittal © 2024</p>
      </footer>
    </>
  )
}

export default App
