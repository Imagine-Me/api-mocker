import React from "react";
import ReactDOM from "react-dom";

const Index = () => {

  return (
    <h1>Hello world</h1>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
