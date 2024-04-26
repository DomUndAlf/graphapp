import React, {createContext, useContext, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Upload from './pages/Upload.js'; //child1
import Home from './pages/home.js';   //child2

const FileContext = createContext(null);

const FileProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <FileContext.Provider value={{ data, setData }}>
      {children}
    </FileContext.Provider>
  );
};

function App() {
  return (
    <div className="App">
      <FileProvider>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      </FileProvider>
    </div>
  );
}

export {FileContext, FileProvider};
export default App;
