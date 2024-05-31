import './App.css'

function App() {
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
          <button className='btn upload-btn'>Upload</button>
        </div>
      </main>
      <footer>
        <p>Apoorv Mittal © 2024</p>
      </footer>
    </>
  )
}

export default App
