/**@jsx MyReact.createElement */
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
      <h1>STEP 3: Adding JSX</h1>
      <ul>
        <li>Adding Babel script to /public/index.html</li>
        <li>Using JSX syntaxe in /public/index.js</li>
      </ul>
      {Button({ backgroundColor: "green", children: "Click me!", onClick: click })}
    </div>
  );
};

//Function that append a component to the parent
function render(component, parent) {
  parent.innerHTML = "";
  parent.appendChild(component);
}

MyReact.render(App(), document.querySelector("#root")); //Render the App
