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
