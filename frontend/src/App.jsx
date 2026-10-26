import { useState } from "react";
import "./App.css";

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const[isDragging,setIsDragging] =useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleDragOver = (event) =>{
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) =>{
    event.preventDefault();
    setIsDragging(false);
    };

  const handleDrop =(event) =>{
    event.preventDefault();
    setIsDragging(false);
    const file =event.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  }
const handleUpload = async () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile);

  setIsUploading(true);
  setStatus("");

  try {
    const response = await fetch("http://localhost:8080/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed (" + response.status + ")");
    }

    const data = await response.json();
    setStatus("Uploaded: " + data.fileName);
    setSelectedFile(null);
  } catch (error) {
    setStatus("Error: " + error.message);
  } finally {
    setIsUploading(false);
  }
};
  return (
    <div className="app">
      <div className="container">
        <h1>FileDrop</h1>

        <p className="subtitle">Share files easily without login</p>

        <div
         className={'upload-box ${isDragging ? "drag-active " : ""}'}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          >
          <div className="icon">📁</div>

          <h2> {isDragging ? "Release to drop" : "Drop your file here"}</h2>

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

       <button
  className="upload-button"
  onClick={handleUpload}
  disabled={!selectedFile || isUploading}
>
  {isUploading ? "Uploading..." : "Upload File"}
</button>

{status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}

export default App;