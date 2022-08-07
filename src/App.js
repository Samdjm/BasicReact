import React from "react";

import Button from "./Components/Button/Button";

import "./style.css";
import logo from "./assets/logo.svg";

const App = () => {
  function click() {
    alert("Click");
  }
  return (
    <div className='container'>
      <h1>Simple React App</h1>
      <p style={{ textAlign: "left" }}>
        You learned how React and Babel works, then you built a Development and Production
        workflow using Webpack.
      </p>

      <p style={{ textAlign: "left" }}>
        You can now code your app using React library, and build it when you are done!
      </p>
      <p>Happy hacking!</p>
      <a href='https://reactjs.org/docs/getting-started.html' target={"_blank"}>
        React Documentation
      </a>
      <a href='https://djemai-samy.com' target={"_blank"}>
        Author: Djemai Samy
      </a>
      <img id='logo' src={logo} alt='logo' />
      <Button backgroundColor={"green"} onClick={click}>
        Click me!
      </Button>
    </div>
  );
};
export default App;
