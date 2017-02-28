This is the proposal README. [Go to the production README].
## Minimum Viable Product

  CalcuGraphic is a web application providing visual graphs showing approxmiation of the area under the curve and slope between two points using Riemann Sums and secant lines, respectively. By the end of this project, the app will have the following criteria:

  - [ ] Identify whether the input is or is not a valid mathematical expression.
  - [ ] Be able to zoom in and out of a graph.
  - [ ] Graph n amount of rectangles to represent Riemann sums.
  - [ ] Graph a secant line to approximate the derivative of a function.
  - [ ] Be able to adjust the change in x (delta x) for secant lines and Riemann sums.
  - [ ] A modal describing how to use the graphing calculator.
  - [ ] A production README.

## Wireframes

This app will consist of a single screen, with the graph taking up most of the space. To the left of the graph will be an area for entering an equation, delta x, Riemann Sum and secant lines toggles. Links to the Github, Linkedin will appear in the bottom.

## Architecture and Technologies

This project will be implemented with the following technologies:

- JavaScript and jQuery for overall structure and logic
- HTML5 Canvas for graphs rendering
- MathQuill for displaying math equations

There will be three scripts involved in this project:

-graph.js: will handle rendering the graphs
-equations.js: will handle the input and parsing of expressions/equations
-calculations.js: will handle Riemann sums and derivative approximations

## Implementation TimeLine

### Day 1: Download, install, and learn the basics of MathQuill and Math.js. Create webpack.config.js and have webpack up and running.

### Day 2: Work on zooming and panning. Implement drawing secant lines, and Riemann sums rectangles.

### Day 3: Work on changing delta x, and have the secant lines and Riemann sums graphically change to support multiple delta x's.
