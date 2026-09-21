import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>FileDrop</h1>

        <p className="subtitle">
          Share files easily without login
        </p>

        <div className="upload-box">
          <div className="icon"></div>

          <h2>Drop your file here</h2>

          <p>or</p>

          <label className="choose-button">
            Choose File
            <input type="file" />
          </label>

          <p className="file-info">
            No file selected
          </p>
        </div>

        <button className="upload-button">
          Upload File
        </button>
      </div>
    </div>
  );
}

export default App;