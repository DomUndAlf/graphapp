// RenderClasses.js
import React from 'react';

const RenderClasses = ({ classes }) => {
  return (
    <>
      {classes.map((className, index) => (
        <p key={index}>{className}</p>
      ))}
    </>
  );
};

export default RenderClasses;
