import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';
import { FileContext } from '../App';
import * as rdf from 'rdflib'; // Importiere rdflib-Bibliothek
import { Network } from 'vis-network';

function Upload() {
  const { data } = useContext(FileContext);
  const [fileContent, setFileContent] = useState(null);
  const [rdfGraph, setRdfGraph] = useState(null); // Zustand für den RDF-Graphen
  const [graphData, setGraphData] = useState(null); // Zustand für die Graphendaten
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (data) {
      readFileContent(data);
    }
  }, [data]);

  useEffect(() => {
    if (rdfGraph) {
    //  convertGraphToVisData(rdfGraph);
    }
  }, [rdfGraph]);

  const readFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      parseRdfContent(content);
    };
    reader.readAsText(file);
  };

  const parseRdfContent = (rdfData) => {
    const extClasses = []; // Array zum Speichern der extrahierten Klassen
  
    console.log('RDF-Daten:', rdfData); // Konsolenausgabe hinzufügen
    const store = rdf.graph();
    const contentType = 'text/turtle'; // Annahme: Das Dateiformat ist Turtle
    const baseUrl = window.location.href; // Basis-URL auf die aktuelle Anwendungs-URL setzen
    rdf.parse(rdfData, store, baseUrl, contentType, (err, rdfGraph) => {
      if (err) {
        console.error('Parsing failed:', err);
        return;
      }
      console.log('file successfully parsed');
  
      // Durchlaufe die Tripel, um die Klassen zu extrahieren
      rdfGraph.statements.forEach((statement) => {
        if (
          statement.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && // Prüfe, ob das Prädikat 'rdf:type' ist
          statement.object.value === 'http://www.w3.org/2002/07/owl#Class' // Prüfe, ob das Objekt 'owl:Class' ist
          //statement.subject.termType === 'NamedNode' // Prüfe, ob das Subjekt ein benannter Knoten ist
        ) {
          // Extrahiere den Klassennamen aus der URI und füge ihn der Liste hinzu
          const className = statement.subject.value.split('#').pop();
          extClasses.push(className);
        }
      });
      
      setRdfGraph(rdfGraph); // Speichere den RDF-Graphen im Zustand
      setClasses(extClasses); // Setze den Zustand für die extrahierten Klassen
    });
  };

  const renderClasses = () => {
    return (
      <>
        {classes.map((className) => (
          <p>{className}</p>
        ))}
      </>
    );
  };

  console.log(classes); //jetzt muss es nur noch im graphen angezeigt werden, lol!


  return (
    <>
      <Header />
      <div className="graph">
        {data ? (
          <div>
            <p>Displayed scheme: {data.name}</p>
            <p>{fileContent}</p>
            {graphData && (
              <div>
                <p>RDF Graph:</p>
                <div id="graph-container" style={{ height: '400px' }}></div>
                {renderClasses()}
              </div>
            )}
          </div>
        ) : (
          <p>No file selected</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Upload;
