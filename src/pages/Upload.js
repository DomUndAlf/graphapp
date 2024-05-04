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

  useEffect(() => {
    if (data) {
      readFileContent(data);
    }
  }, [data]);

  useEffect(() => {
    if (rdfGraph) {
      convertGraphToVisData(rdfGraph);
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
    console.log('RDF-Daten:', rdfData); // Konsolenausgabe hinzufügen
    const store = rdf.graph();
    const contentType = 'text/turtle'; // Annahme: Das Dateiformat ist Turtle
    const baseUrl = window.location.href; // Basis-URL auf die aktuelle Anwendungs-URL setzen
    rdf.parse(rdfData, store, baseUrl, contentType, (err, rdfGraph) => {
      if (err) {
        console.error('Fehler beim Parsen der RDF-Datei:', err);
        return;
      }
      console.log('RDF-Datei erfolgreich geparst.');
  
      // Ausgabe der Tripel in der Konsole
      rdfGraph.statements.forEach((statement, index) => {
        console.log(`Triple ${index + 1}:`);
        console.log('Subject:', statement.subject.value);
        console.log('Predicate:', statement.predicate.value);
        console.log('Object:', statement.object.value);
        console.log('---');
      });
  
      setRdfGraph(rdfGraph); // Speichere den RDF-Graphen im Zustand
    });
  };
  

  const convertGraphToVisData = (graph) => {
    const nodes = [];
    const edges = [];
    graph.statements.forEach((statement, index) => {
      const subject = getReadableTerm(statement.subject);
      const predicate = getReadableTerm(statement.predicate);
      const object = getReadableTerm(statement.object);

      if (!nodes.find((node) => node.id === subject)) {
        nodes.push({ id: subject, label: subject });
      }
      if (!nodes.find((node) => node.id === object)) {
        nodes.push({ id: object, label: object });
      }
      edges.push({ id: index, from: subject, to: object, label: predicate });
    });
    setGraphData({ nodes, edges });
  };

  const getReadableTerm = (term) => {
    if (term.termType === 'NamedNode') {
      return term.value.split('#').pop();
    } else {
      return term.value;
    }
  };

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
