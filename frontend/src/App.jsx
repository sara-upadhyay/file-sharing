import { useState } from "react";
import "./App.css";

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>FileDrop</h1>

        <p className="subtitle">Share files easily without login</p>

        <div className="upload-box">
          <div className="icon">📁</div>

          <h2>Drop your file here</h2>

          <p>or</p>

          <label className="choose-button">
            Choose File
            <input type="file" onChange={handleFileChange} />
          </label>

          <p className="file-info">
            {selectedFile
              ? `${selectedFile.name} (${formatSize(selectedFile.size)})`
              : "No file selected"}
          </p>
        </div>

        <button className="upload-button" disabled={!selectedFile}>
          Upload File
        </button>
      </div>
    </div>
  );
}

export default App;