import React, {useContext} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';
import { useState, useEffect } from 'react';
import { FileContext } from '../App';

// const processTurtleData = (selectedFile) => {
//     console.log('hi');
//     // Hier können Sie Ihre Logik zum Verarbeiten der Turtle-Daten implementieren
//   };

  function Upload() {
    const {data} = useContext(FileContext);
    const [fileContent, setFileContent] = useState(null);

    useEffect(() => {
      if (data) {
        readFileContent(data);
      }
    }, [data]);

    const readFileContent = (file) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const content = event.target.result;
        setFileContent(content);
      };
      reader.readAsText(file);
    };

    return (
      <>
      <Header />
      <div className ="graph">
        {data ? (
          <p>Displayed scheme: {data.name} {fileContent}</p>
        ) : (<p>no file selected :</p>)}
      </div>
      <Footer />
      </>
    );
  }
  
  export default Upload;
