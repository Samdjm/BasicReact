# React Story

From vanilla javascript to a real React app step by step.

(You can use commits history to follow the steps.)

## STEP 1: Basic structure

Let's get started with a basic public folder with:

- /public:

  - index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>STEP 1: Basic structure</title>

      <!--OUR STYLE-->
      <link rel="stylesheet" href="./style.css" />
    </head>
    <body>
      <!--OUR SPA-->
      <div id="root"></div>

      <!--OUR SCRIPT-->
      <script src="./index.js"></script>
    </body>
  </html>
  ```

  - style.css

  ```css
  @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

  * {
    color: whitesmoke;
    font-family: "Fira Sans", sans-serif;
  }

  body {
    background-color: rgb(38, 38, 38);
  }

  .container {
    background-color: rgb(48, 48, 48);
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin: auto;
  }

  span {
    font-weight: 300;
    text-decoration: underline;
    font-size: 1.2em;
  }

  p {
    font-weight: 200;
    font-size: 0.9em;
    text-decoration: none;
  }
  ```

- index.js

```javascript
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
```

---
