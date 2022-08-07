const Button = ({ backgroundColor, children, onClick }) => {
  return (
    <button
      style={{ backgroundColor: backgroundColor, padding: "10px", border: "none" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

//The Global parent component
const App = () => {
  //Function to test click event
  function click() {
    alert("Click");
  }
  return (
    <div className='container'>
      <h1>STEP 4: Adding React</h1>
      <ul>
        <li>Adding Babel script to /public/index.html</li>
        <li>Using JSX syntaxe in /public/index.js</li>
      </ul>
      <Button backgroundColor={"green"} onClick={click}>
        Click me!
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root")); //Render the App
