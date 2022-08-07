# React Story

From vanilla javascript to a real React app step by step.

Use commits history to follow the steps, and learn how React and Babel works, then we build a basic workflow using webpack and node.

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

---

---

## STEP 2: Our Own Simple React Clone (MyReact)

Let's implement a basic logic of React, to understand how it works.

## <u>The library</u>

### Function helper to transfrom compoenent objects

```javascript
function createElement(type, props, ...children) => { type, props }
```

### Function to create texts components

```javascript
function createTextElement(nodeValue) => { type, props };
```

### Function that transfrom objects to HTMLElements and recursively append them to the parent

```javascript
function render(component, parent) => void;
```

Function help render fuction to set attributes of HTMLElement: style, events...

```javascript
function updateProperties(element, props) => void;
```

---

## <u>/MyReactCDN/MyReact.cdn.js: (Implementaion)</u>

```javascript
const MyReact = (() => {
  const TEXT_ELEMENT = "TEXT";

  //Create components
  function createElement(type, configObject, ...args) {
    const props = Object.assign({}, configObject);

    const nodeChildren = args.length > 0 ? [...args] : []; //To add children in props

    props.children = nodeChildren.map(
      (c) => (c instanceof Object ? c : createTextElement(c)) //create children or text node
    );
    return { type, props };
  }

  function createTextElement(nodeValue) {
    return {
      type: TEXT_ELEMENT,
      props: {
        nodeValue,
        children: [],
      },
    };
  }

  function render(component, parent) {
    console.log(component);
    const element = component;
    const dom =
      element.type == TEXT_ELEMENT
        ? document.createTextNode(element.props.nodeValue)
        : document.createElement(element.type);
    updateProperties(dom, element.props);
    element.props.children.forEach((child) => render(child, dom));
    parent.appendChild(dom);
  }

  return {
    createElement,
    render,
  };
})();

//DOM utils:
function updateProperties(element, props) {
  //Managing events like: onClick, onChange...
  const isListener = (name) => name.startsWith("on"); //true if onEvent

  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2); //onEvent => event
      element.addEventListener(eventType, props[name]); //onEvent:callback => (event, callback)
    });

  //Managing events like: onClick, onChange...
  if (props.style) {
    Object.keys(props.style).forEach((name) => {
      element.style[name] = props.style[name];
    });
  }

  //Managing attriubute like: style, id...
  const isAttribute = (name) =>
    !isListener(name) && name !== "children" && name !== "style";

  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      element[name] = props[name];
    });
}
```

---

## <u>/public/index.js</u>

Let's use the library in our App:

```javascript
//Button component
const Button = (props) => {
  return MyReact.createElement(
    "button",
    {
      onClick: props.onClick,
      style: {
        backgroundColor: props.backgroundColor,
        padding: "10px",
        border: "none",
        color: "white",
      },
    },
    props.name
  );
};

//The Global parent component
const App = () => {
  //Function to test click event
  function click() {
    alert("Click");
  }
  return MyReact.createElement(
    "div",
    { className: "container" },

    //Title
    MyReact.createElement(
      "h1",
      { style: { color: "#108cb5" } },
      "STEP 2: Our Own Simple React Clone"
    ),
    //Unordered list
    MyReact.createElement(
      "ul",
      { style: { border: "black" } },
      MyReact.createElement(
        "li",
        {},
        "/MyReactCDN/MyReact.cdn.js",
        MyReact.createElement(
          "ol",
          {},
          MyReact.createElement(
            "li",
            {},
            "MyReact.createElement(tag, props, ...children)"
          ),
          MyReact.createElement("li", {}, "MyReact.render(compoenent, parent)")
        )
      )
    ),
    Button({ onClick: click, backgroundColor: "green", name: "Click me!" })
  );
};

//Function that append a component to the parent
function render(component, parent) {
  parent.innerHTML = "";
  parent.appendChild(component);
}

MyReact.render(App(), document.querySelector("#root")); //Render the App
```

---

---

---

## /public/index.html

Let's add the library to our html file:

```html
...

<!--MyReact CDN-->
<script src="../MyReactCDN/MyReact.cdn.js"></script>

<!--OUR SCRIPT-->
<script src="./index.js"></script>

...
```
