# COCO RUSH

This is a simple game designed as a "minimal-jargon" tutorial for new-comers to the React world.
It is built & deployed using [CodeSandbox](https://codesandbox.io)

Only one thing to keep in mind, before you begin:
- Read up only minimum amount of info needed to build something cuz learning everything and then starting to code is boring :P

## Running the code in dev mode
Fork the project at https://codesandbox.io/s/4rom3r73nx and start editing to see live changes on the right of editor.

And when you're happy, go ahead and send me a PR :)

## Prerequisites

Not knowing React, or even JS can be a challenge but not impossible to understand this codebase.
I'm going to list down minimal know-how in following bullet points:

- The app is scaffolded using [Create React App](https://github.com/facebook/create-react-app/) template.
It gives you a minimal code structure to work with so that you only need to write app logic.

- **Imports & Exports** help us split the code into multiple modules.
For eg: `Game.js` imports helpers and components from modules `components.js` and `helpers.js`
like so: `import helpers from './helpers';`

And `helpers.js` makes the stuff inside it available using `export` keyword
like so: `export default { getChocolates };`

**Types**: There are two types of imports/exports:
1. default: As seen in example above. You'd need to add extra keyword "default" after export. You can directly import such exports and name it whatever you like (we used import helpers in above example).
2. named: A named export looks like this -> `export const x='marks the spot';`. To import this exported variable you'd need to know the name of the variable, which is `x` in this case.
So, it'd look like this -> `import { x } from './vars';`

- **Dependencies** are reusable code modules that can be installed in our codebase.
Ex: `import React from 'react';`
You can add a dependency from the File Editor option in Codesandbox editor.

- **JSX**: The html like syntax you see in `index.js` and `Game.js` is called `JSX`.
This is something you need to write in order to render some UI elements.

Apart from this basic info you'd need few more things to get going:
- Crash Course on JS -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript
- If you'd like to read more on stuff mentioned above go here -> https://reactjs.org/docs/hello-world.html

## File Structure

This is where we go into important individual files and understand what's going on in there.

1. `/index.js`: This is the root file. This is where your App is being rendered.
As you can see a named import `render` is used to render a React component `Game`.
`render` function accepts 2 arguments, second one is the root Element where `Game` Component is going to be rendered.

2. `Game.js`: This module exports a React component. You can read more about what it is here -> https://reactjs.org/docs/components-and-props.html
I'll briefly describe what it is:
So, a react component is just a function or a class which can be rendered as described above.
If you're using a function to describe a component, it looks like this:
```
function Game() {
  return (
    <div>
      This is awesome
    </div>
  );
}
```
As you can see, you need to return JSX which you'd like to render.

But, in the `Game` module we have used a class to describe the component, like so:
```
class Game extends React.Component {
  state = {
    likeThisGame: false
  };
  render() {
    return (
      <div>
        React is fun!! And I love chocolates! :P
      </div>
    )
  }
}
```
So, you need to return your JSX from render method in this case.
And as you'd have noticed we're also extending this class with `React.Component`.

Going further, you can see that there is a `state` property used.
In layman terms, this can be used to dictate what state our UI is in currently and also contain some data required in the app.

So, let's say i need to update the state key `likeThisGame` to `true` on button click. I'd do something like:
```
class Game extends React.Component {
  state = {
    likeThisGame: false
  };
  like = () => {
    this.setState({ likeThisGame: true });
  };
  render() {
    return (
      <div>
        React is fun!! And I love chocolates! :P
        <button onClick={this.like}>I like It</button>
      </div>
    )
  }
}
```
I added a method in the class called `like` and used inherited method from `React.Component` class `this.setState` to toggle the state variable `likeThisGame`
I also added a `button` in the `render` method a used `like` method as listener to `onClick` event for this button.

That's it. Now when you click on the button you'll update the state to like the game :)

But, when you see the actual file, you'll notice non-html tags in there. Weird!
So, this is possible due to another library that helps us build simple components with CSS. It is called `styled-components`

3. `components.js`:
The default export `styled` exposes all the html components which we can wrap with some css to create out custom React components.

These components are exported from this file and imported back in `Game.js` to be used while rendering the App.

## Next Steps

Obviously, a bland UI like this looks no way near to an interesting game.
So, following ideas can be used to make this game awesome:

1. Add chocolate images instead of numbers
2. Count number of clicks made to uncover all boxes
3. Add a timer (a timed game ¯\_(ツ)_/¯ )
4. Add a few power ups that allow you to see the full board for few seconds
5. Show feedback (animated/border color) on match found
6. Add some flairs balloons, etc. when game is completed
7. Add multiple levels (more boxes/lesser time/lesser allowed clicks ¯\_(ツ)_/¯ )
8. Add a lot of animation (during game load, click, match, etc.)
9. {Add your ideas! :)}