//Button component
const Button = ({ style, onClick, children }) => {
  const button = document.createElement("button"); //creating the HTML element

  button.style = style; //adding style from props

  //Adding default style
  button.style.border = "none";
  button.style.padding = "10px";
  button.style.margin = "auto";

  button.addEventListener("click", onClick); //adding event from props

  button.innerHTML = children; //Adding children inside the button

  return button; //Return element to append in parent
};

//The Global parent component
const App = () => {
  //Function to test click event
  function click() {
    alert("Click");
  }
  const div = document.createElement("div"); //creating the HTML element

  div.classList.add("container"); //Adding a class to the div

  //Adding some content
  div.innerHTML = `
                    <h1 style="color:#108cb5;">STEP 1: Basic structure</h1>
                    <ul>
                        <li>
                            <span>/public:</span>
                            <p>Folder served for development. Later we will bundle evrything in a /build folder</p>
                            <ol>
                                <li>
                                    <span>index.js:</span>
                                    <p>The entry point for the Single Page App</p> 
                                </li>
                                <li>
                                    <span>inex.html:</span>
                                    <p>The single html file of our app</p> 
                                </li>
                                <li>
                                    <span>style.js:</span>
                                    <p>The Stylesheet</p> 
                                </li>
                            </ol> 
                        </li>
                    </ul>
                       
`;
  //Adding the Button component at the end
  div.appendChild(
    Button({
      style: "background-color:green;",
      onClick: click,
      children: "Click me!",
    })
  );
  return div; //return the element to render in the root
};

//Function that append a component to the parent
function render(component, parent) {
  parent.innerHTML = "";
  parent.appendChild(component);
}

render(App(), document.querySelector("#root")); //Render the App
