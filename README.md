[![npm](https://img.shields.io/npm/dt/deusjs.svg)](#)

DeusJS
===========

> \[**dey** -uh s **jey**-uh s\]

**A very lightweight front-end framework inspired by React but easier to learn
and use.**

> Warning: This package is new and under development.

If you know HTML and JavaScript, you can learn DeusJS very quickly.

- Create components with props and state using actual HTML to template the output
- Navigation between 'screen' components
- Autoloading of all components, no need to import/require components or 
  configure nav data in the app. (However, you absolutely can!)
- Easy events/triggering/messaging between components.
- Easy access to parent and children components.
- Access to a global state.
- Efficient DOM rendering on state change.


## Usage

Get your hands on [deus.js](https://raw.githubusercontent.com/braksator/DeusJS/master/deus.js) and `require()` the file.

Everywhere you use DeusJS you'll have to require DeusJS in your project:

```javascript
const DeusJS = require('./path/to/deus.js');

```
You might name the constant something other than `DeusJS`, perhaps the name of your app.

### Usage with NPM

DeusJS [is available on NPM](https://www.npmjs.com/package/deusjs) if you prefer: `npm install deusjs -S` or with Yarn (recommended): `yarn add deusjs`


## Setting up a project

The basic idea is you create an index.html or otherwise output a starting HTML 
page like so:

```
<!DOCTYPE html>
<html>
    <head>
        <title>Your project name</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="global.css">
    </head>
    <body>
        <div id="my-splash-page">
            This is the document we'll see until we call Nav.go() in app.js
            so this can be used as a splash page until things are ready.
        </div>
        <script src="myApp.js"></script>
    </body>
</html>
```

Note the script tag which will pull in our front-end application (assuming your
back-end doesn't load this for you in some other way).  Note also that we've 
used a global stylesheet as this lets us set up our common styles, which may be 
a prefered way to approach styling for many projects.

See the "HelloWorld example" below for an idea of how to write your `myApp.js`.


## Creating a component

### HelloWorld example

Create a directory named `scr` and then create a file inside named `HelloWorld.js`.  It is
possible to reconfigure the default directory path (see "Config").

```javascript
const MyApp = require('deusjs');

module.exports = class HelloWorld extends MyApp.Cmp {
    title = 'My Hello World component';
    html() {
        return `
            <p>hello, world!</p>
        `;
    }
}
```
Note the use of backticks around the HTML, this will allow executing JavaScript 
code inside the HTML using `${expression}` placeholders.  If you're unfamiliar
with this type of JavaScript syntax check out 
[Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

Tip: There are Visual Studio Code extensions that will syntax highlight the HTML here, 
you can find them by searching for "es6-string" in the extensions marketplace.

> Warning! only the first HTML element (and its children) will be used.
> A convention you might adopt is to wrap groups of HTML elements in a `<div>`.

Note how a value was set to the `title` property, this is not neccessary for
most components, but this component will be treated as a navigation screen,
and the `title` property is recognised by the navigation system.

Your myApp.js:

```javascript
document.addEventListener("DOMContentLoaded", function(){
    const MyApp = require('deusjs');

    // Navigate to HelloWorld screen.
    MyApp.go('HelloWorld');
});
```

Since we're navigating to this component it will be the root component of the app,
it is essentially the screen container, it has no parent.  It will automatically replace
the `body` of your document unless the `container` argument is supplied in 
`MyApp.go()` which would be a HTMLElement selected from the DOM:

> `MyApp.go(screenName[, props, container])`

You don't need to import or require the component, it will be autoloaded.

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
            <p>${this.use('SampleText')}</p>
        `;
    }
```

You don't need to import or require the SampleText component, it will be autoloaded.

You don't have to use the autoloading feature:

```javascript
const SampleText = require('SampleText');

    html() {
        return `
            <p>${this.use(SampleText)}</p>
        `;
    }
```

> `this.use(screenName[, props])`

To create the SampleText component:
Create a directory named `cmp` where your `scr` directory is located.  This
directory will store components that will never be used as root level screens.
Now create a file called `SampleText.js` with the following code:

```javascript 
module.exports = class SampleText extends MyApp.Cmp {
    html() {
        return "Lorem Ipsum Dolor Sit Amet";
    }
}

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
- `this.e` The HTMLElement parsed from the component's HTML.
- `this.r` An internally used rendering flag, modifying this may lead to undefined behaviour.

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

> `MyApp.go(screenName[, props, container])`

> `MyApp.back([numberOfSteps, ..?])`

Screen titles are set by the component's `title` property.

You don't need to configure any navigation paths, 
the navigation system will just load and render components as needed, and
the URL will be appended with the component's name.  However you can do 
this if you want to:

```javascript
// Register it.
myApp.r['some/uri/here'] = ComponentClass;

// Use it.
myApp.go('some/uri/here');

// Free up memory if no longer needed.
delete myApp['some/uri/here'];

```
These can be dynamically added and deleted at runtime as required.  
> This registry can be used to cache any component class for future use, and 
> bypass the autoloader.


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


## Config 

### Configure component autoloading

You can change the path of where components are kept by changing the value of `MyApp.sp` for navigation screens and `MyApp.cp` for other components.  

Store all components in the `cmp` directory: 

`MyApp.sp = MyApp.cp;`.

The default value for `MyApp.sp` is `'./scr/'` and for `MyApp.cp` it is `'./cmp/'` so those directories will be expected at the root level of your project.

### Configure DOM attachment

The default DOM diffing and rendering is done by `MyApp.a()`, you can override
this function by redefining it.  For example some components may need to render
simply with a straight swap, or render into a cloned element to facilitate a
transition animation. 
