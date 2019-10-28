[![npm](https://img.shields.io/npm/dt/deusjs.svg)](#)

DeusJS
===========

> \[**dey**-uh s **jey**-uh s\]

**A very lightweight front-end framework inspired by React but easier to learn
and use.**

> Warning: This package is new and under development.

If you know HTML and JavaScript, you can learn DeusJS very quickly.

## Usage

Get your hands on [deusjs.mjs](https://raw.githubusercontent.com/braksator/DeusJS/master/deusjs.mjs)
and save it in your project.

### Usage with NPM

DeusJS [is available on NPM](https://www.npmjs.com/package/deusjs): `npm install deusjs -S` 

or with Yarn (recommended): `yarn add deusjs`


### Including DeusJS in your project

```javascript
import MyApp from './deusjs.mjs';
```

### With CommonJS

If you're using an environment where CommonJS modules are supported in lieu of
ES modules, you'll need [deusjs.cjs](https://raw.githubusercontent.com/braksator/DeusJS/master/deusjs.cjs) instead.

```javascript
const MyApp = require('./deusjs.cjs');
```

## Creating a component

### HelloWorld example


`index.html`:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<h1>Loading...</h1>
		<script type="module" src="./helloworld.js"></script>
	</body>
</html>
```

`helloworld.js`:

```javascript
import helloWorldApp from "./deujs.mjs";

class HelloWorldScreen extends helloWorldApp.Cmp {
	title = 'Hello World App';

	state = {
		helloList: [],
	};

	addHello() {
		var helloList = this.state.helloList;
		helloList.push('hello');
		this.set({'helloList': helloList});
	}

	html() {
		return `
			<h1>hello, world!</h1>
			<p>This is the HelloWorldApp.</p>
			<button id="hello-button">say hello</button>
			<div>${this.use(ListMaker, {items: this.state.helloList})}</div>
		`;
	}

	post() {
		document.getElementById("hello-button").addEventListener('click', this.addHello);
	}
}

class ListMaker extends helloWorldApp.Cmp {
	html() {
		var items = this.props.items;
		return `
			<ul>
				${items.map(item => `<li>${item}</li>`).join('')}
			</ul>
			<style>
				ul { 
					color: green; 
				}
			</style>
		`;
	}
}

helloWorldApp.go(HelloWorldScreen);
```


### Insert props into the HTML.

This component gets the contents of the paragraph passed to it as a prop from
its parent.

```javascript    
    html() {
        return `
            <p>${this.props.paragraphText}</p>
        `;
    }
```

### Insert JavaScript calculation into the HTML.

This JavaScript placeholder has an expression that will print out the number `4`.

```javascript    
    html() {
        return `
            <p>2 + 2 = ${2 + 2}</p>
        `;
    }
```

### Insert another component into the HTML

This is how the sausage is made.  You'll be doing this a lot.  In this example
a component called "SampleText" is inserted.

```javascript
    html() {
        return `
            <p>${this.use(SampleText)}</p>
        `;
    }
```

> `this.use(component[, props])`

```

### Updating components

Rerendering can only be done through setting state by calling `this.set({someKey: someVal})`.
If you want to rerender, then *something* changed, and you need to represent
that change by tracking a state for something.  That being said, calling
`this.set({})` without changing the value of the state allows you to
trigger a rerender if there is some external factor (such as global state)
that has caused the return value of html() to change.

> `this.set({key1: val1[, key2: val2, ...]})`

### Methods to implement

Here are all the member functions you can implement.

- `load()` Called when the component is loaded.
- `html()` Return the HTML template of your component, called prior to every potential rerender.
- `post()` Called after the HTML is rendered.
- `unload()` Called when the component is about to unload.

### Component data

Some other things you can access:

- `this.props` The props passed in from a parent's `this.use()` or via `MyApp.go()`.
- `this.state` The state object resulting from your calls to `this.set()`. 
- `this.c` Array of children, each in the format of an object with keys `n` (name), `p` (props), and `c` (component).
- `this.p` Parent component (will be undefined for the root component).
- `this.e` The HTMLElement node parsed from the component's HTML.
- `this.r` An internally used rendering flag, modifying this may lead to undefined behaviour.
- `this.i` An internally used component ID.

> You can manipulate parent and child components, e.g. 
> `this.p.set({someKey: someValue})`, this circumvents the classic 
> *reactive* workflow.  But it's your app, you decide how you want
> to do things, DeusJS lets you be in charge.

### Styles

DeusJS needs no special facility for styles.  Create global CSS for your 
app in your root HTML document.  Component related CSS can be supplied in 
the HTML via `<style></style>` tags, inline styles (via the HTML 'style' 
attribute), and any manipulation via JavaScript that is needed.

## Navigation

Basic navigation is demonstrated above with the HelloWorld example.

> `MyApp.go(component[, props, method, container])`

> `MyApp.back([numberOfSteps, ..?])`

Screen titles are set by the component's `title` property.

You don't need to configure any navigation paths, 
the navigation system will just load and render components as needed, and
the URL will be appended with the component's name.  However you can do 
this if you want to:

```javascript
// Register it.
myApp.r['some/uri/here'] = MyComponentClass;

// Use it.
myApp.go('some/uri/here');


```
These can be dynamically added and deleted at runtime as required.

## Transitions

By default components are updated using a DOM diff that makes minimal updates 
to the DOM.  This may not be always desirable as it doesn't allow for 
transition animations.  A component's default attachment method can be set 
like so:

```javascript
module.exports = class Example extends MyApp.Cmp {
    m: 2000,
    html() {
        return "Lorem Ipsum Dolor Sit Amet";
    }
}
```

In this case the component class property `m` is set to 2000.  The "new" element
will be appended to the container as a sibling to the "old" element.  The "old"
element will receive a new class name `rm`.  After 2000ms the "old" element will 
be removed from the document. It is advisable to use CSS to transition out the 
"old" element based on the `.rm` selector.  Your "new" element could start
invisible or off-screen, and transition into view.  Ensure your CSS transitions
are done within the time supplied.

To restore default behaviour:
```javascript
delete this.m;
```

You can supply a custom DOM attachment function like so:

```javascript
module.exports = class Example extends MyApp.Cmp {
    m: (element, containerElement) => {
        // Your DOM manipulation code here.
    },
    html() {
        return "Lorem Ipsum Dolor Sit Amet";
    }
}
```

You can override this when navigating by setting the `method` arg of `myApp.go()`
using the delay integer, or the callback.  Note: the callback also receives a
3rd argument; the component itself.

## Events / Triggers / Messaging 

Components can communicate and pass data via the event emitter and listeners.

### Listening for an event

Components typically use `MyApp.on()` in their `load()` function, and `MyApp.off()`
in their `unload()` function.  Alternatively a one-time listener can be
created anywhere with `MyApp.once()`.

> `MyApp.on(eventName[, callback])`

> `MyApp.off(eventName[, callback])`

> `MyApp.once(eventName[, callback])`

The callback will receive a single argument which is the data sent by the 
emitter.  And yes, you need to supply the exact same callback to the `.off()`
function as you did in the `on()` function so it can identify which listener to remove.

### Triggering an event or sending data

Components emit an event that another is listening for:

> `MyApp.emit(eventName[, data])`

## Global State

Setting global states doesn't trigger any rerender unless you also call 
`this.set({})` within the component that should be rechecked.

> `MyApp.set({key1: val1[, key2: val2, ...]})`

> `var value = MyApp.state.key1`
