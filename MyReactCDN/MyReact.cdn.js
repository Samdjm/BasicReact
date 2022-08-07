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
