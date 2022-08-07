import React from "react";

import Button from "./Components/Button/Button";

import "./style.css";
import logo from "./assets/logo.svg";

//The Global parent component
const App = () => {
  //Function to test click event
  function click() {
    alert("Click");
  }
  return (
    <div className='container'>
      <h1>STEP 7: Loaders, plugins and dev server</h1>
      <ul>
        <li>Installing loaders: style-loader css-loader file-loader</li>
        <li>Installing plugins: html-webpack-plugin</li>
        <li>Adding: /src/style.css</li>
        <li>Adding: /src/assets/logo.svg</li>
      </ul>
      <Button backgroundColor={"green"} onClick={click}>
        Click me!
      </Button>
      <img src={logo} alt='logo' />
    </div>
  );
};
export default App;
