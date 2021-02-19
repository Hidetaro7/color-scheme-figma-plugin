# Color Scheme for Figma

![Frame 2](https://user-images.githubusercontent.com/281424/108452867-a69a3f00-72ac-11eb-81b8-0d9a1ba6517a.jpg)

This demonstrates:

- bundling plugin code using Webpack, and
- using Vue.

The main plugin code is in `src/code.ts`. The HTML for the UI is in
`src/ui.html`, while the embedded JavaScript is in `src/ui.js` and the Vue script is in `src/App.vue`.

These are compiled to files in `build/`, which are what Figma will use to run
your plugin as set in the `manifest.json`.

To build:

    $ npm install
    $ npx webpack

n 11.14.0

    $ yarn watch

[webpack]: ../webpack/
