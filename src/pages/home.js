import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"
import {FileContext, FileProvider} from "../App";


const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { setData } = useContext(FileContext);

  const uploadFail = () => {
    alert("No file uploaded");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
      if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      uploadFail();
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleProceed = () => {
      setData(selectedFile);
      navigate("/upload");
  };

  return (
    <>
      <Header />
      <div className="welcomeWindow">
        <p className="welcome">Welcome to GrApp!</p>
        <div style={{ display: selectedFile ? 'none' : 'block' }}>
          <p>Upload your .ttl file</p>
          <button id="uploadBut" onClick={handleUploadClick}>
            Upload
          </button>
        </div>
        <input type="file" id="fileInput" accept=".ttl" style={{ display: 'none' }} onChange={handleFileChange} />
        <div id="fileName" style={{ display: selectedFile ? 'block' : 'none' }}>
          <p>This is the file you chose: {selectedFile ? selectedFile.name : ''}</p>
          <button onClick={handleUploadClick}>Choose other file</button>
          <button onClick={handleProceed}>Proceed with elected file</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

