// RenderClasses.js
import React from 'react';
import '../Classes.css'
import Draggable from 'react-draggable';


const RenderClasses = ({ classes }) => {
  return (
    <>
      {classes.map((className) => (
        <Draggable>
          <div class="node">
            <h5 class="card-title">{className}</h5>
            <p class="descript">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="uri">URI</a>
          </div>
          </Draggable>
      ))}
    </>
  );
};

export default RenderClasses;


