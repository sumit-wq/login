import React from "react";
import "./styles.css"

const Loader: React.FC = () => {
  return (
    <div data-testid={"loader"} className="loader-overlay">
      <div className="loader">
        <div className="spinner"></div>
       
      </div>
    </div>
  );
};

export  {Loader};
