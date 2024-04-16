# Framework Documentation

This framework is a lightweight JavaScript library for building user interfaces. It provides a simple and intuitive API for creating components, handling events, and managing application state.

### Features
 - Component-based architecture
 - Event handling
 - State management
 - Routing

### Start 

To start using this framework, you should initialize the application and add components to it and finally render the application:
```js
// app.js
const app = new Framework()

// your components will be created here.
// ...

// add your components to the application
app.addComponent(my-component)

// Render the application
app.render()
```

### Creating an Element
To create an element, you instantiate a new Component. The constructor takes three arguments: the tag name, an object of attributes, and an array of children.

In this example, we're creating a `div` element with an `id`:
```js
const div = new Component("div", {id: "foo"})
```

### Creating an Event
To create an event, you use the `actionListener()` method on a Component instance. This method takes two arguments: the event type and a callback function.

```js
const clearBtn = new Input({id: 'clear', type: 'button', value: 'Clear'});
clearBtn.actionListener('click', callback);
```

In this example, we're creating a `click` event on the `clear` button that calls `callback` function.

### Nesting Elements
To nest elements, you use the addElement method on a Component instance. This method takes any number of Component instances as arguments.

```js
div.addElement(title, p)
```

In this example, we're adding the `title` and `p` components as children of the `div` component.


### Adding Attributes to an Element
To add attributes to an element, you pass an object of attributes as the second argument to the Component constructor.

```js
const title = new Component("h1", {id: "title"}, ["TO:DO List"]);
```

In this example, we're creating an `h1` element with an `id` of `title`.

### Routing system

The routing system in our framework allows you to manage different views in your single-page application. To implement this, you need to use the setRoutes function of the application instance. This function should be called just before rendering the application.

The `setRoutes` function takes an array of arrays as arguments. Each sub-array represents a route and consists of two elements: the path string and a callback function. The path string defines the URL path for the route, the callback function is executed when the route is accessed, and the component to binding link.


```js
app.setRoutes([
    ["/", homeCallback, myLink1],
    ["/foo", fooCallback, myLink2],
    ["/baz", bazCallback, myLink3]
])

// Render the application
app.render()
```
In the above example, three routes are defined: "/", "/foo", and "/baz". When the user navigates to these paths, the corresponding callback functions (`homeCallback`, `fooCallback`, `bazCallback`) are executed.

In the above example, a `Link` Component named "foo" is created and bound to the "/foo" route. When this link is clicked, the application will navigate to the "/foo" route.

### Why Things Work the Way They Work
This framework uses a component-based architecture, which promotes reusability and separation of concerns. Each component is responsible for its own state and behavior, and can be composed with other components to build complex user interfaces.

The event handling system allows you to easily attach behavior to user interactions, and the state management system ensures that your application's state is always in sync with the UI.

The routing system allows you to build single-page applications with multiple views, without the need for a backend server.