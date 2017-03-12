# CalcuGraph

[Live!][CalcuGraph]
[CalcuGraph]: http://dannyou.pro/calcu_graph/

## Summary

CalcuGraph is a browser-based graphing calculator. It allows users to graph math functions, trace the values of the functions, find equation of the tangent line of the function, and approximate the area under the curve.

Other features include drag-and-drop window movement, zoom in/out on any point via mouse scroll, and immediate pretty-printing of equations.

## Instructions

+ In the right panel, type in the equation that you would like to graph. You can choose trace mode. Trace Mode allows you to move your mouse in the plane and see the x-y values of this graph as you move.
+ Basic features include zoom in/out by scrolling your mouse, and panning to different parts of the plane by dragging/dropping with your mouse.
+ The X Min, X Max, Y Min, and Y Max can be used to adjust the graph window.
+ Tracer Coordinate option shows the x, y coordinate of the function.
+ Derivative option shows the tangent line at the Tracer point of the function.
+ Area Under the Curve approximate the area under the curve between the lower and upper bounds using Left End Point Riemann Sums.


## Technology

### CalcuGraph was built using:
- [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for rendering of the equations
- [Math.js](http://mathjs.org/) for parsing, compiling, and evaluating math expressions
- [MathQuill](http://mathquill.com/) for immediate pretty-printing of math expressions
- [jQuery](https://jquery.com/) for DOM manipulation

## Features

### Drag and Drop Panning
CalcuGraph includes a custom drag-and-drop panning implementation. It listens for the mouse down event and then tracks the movement of the mouse, adjusting the window, axes, and graphs in real-time. The code below 1) calculates the number of pixels that the xy-plane has been dragged; 2) resets the `clickPos` to the current position; 3) converts the dragging distance from pixels to xy units; 4) adjusts the calculator's window to reflect the mouse movement.

```javascript
panning(){
  if (this.mousedown === true){
    let xCurr = this.getMousePos(canvas, event).x;
    let yCurr = this.getMousePos(canvas, event).y;
    let posDeltaX = (this.clickPos.x - xCurr)/1.2;
    let posDeltaY = (this.clickPos.y - yCurr)/1.2;
    this.clickPos.x = xCurr;
    this.clickPos.y = yCurr;
    let deltaX = this.xMax - this.xMin;
    let deltaY = this.yMax - this.yMin;
    this.xMin = this.xMin - posDeltaX;
    this.yMin = this.yMin - posDeltaY;
    this.xMax = this.xMin + deltaX;
    this.yMax = this.yMin + deltaY;
  }
}
```

### Scroll-Zoom
CalcuGraph also allows users to zoom in or out using the mouse wheel event. It treats zooming as a dilation and re-calculates the window accordingly. The zooming comes from the center of the visible window.

```javascript
zooming(){
    let scale = (event.deltaY) / 1000;
      this.xMin = (this.xMin) - (this.xMin * scale);
      this.xMax = (this.xMax) - (this.xMax * scale);
      this.yMin = (this.yMin) - (this.yMin * scale);
      this.yMax = (this.yMax) - (this.yMax * scale);
}
```

![alt text](https://github.com/idannyou/calcu_graph/blob/master/images/Inputting_Equation_1.gif "Scrolling, Zooming, and Entering Equation")

### Derivative Option
CalcuGraph allows users to get the equation of the tangent line relative to the tracer point. The Derivative option is to be used with the tracer option.

The tangent line comes from determining the y-intercept and using Math.js derivative function to determine the slope (m).

```javascript
extractTanLine(m, currX, currY, input){
  let b = Math.round((currY - m * currX) * 100) / 100;
  m = Math.round(m * 100) / 100;
  let string = `${m} * x + ${b}`;
  this.tangentStr = string;
  let parseTanLine = math.compile(string);
  return (parseTanLine.eval({x: input}));
}
```
![alt text](https://github.com/idannyou/calcu_graph/blob/master/images/Derivative_Equation_1.gif "Derivative Equation")


### Area Under the Curve Option
CalcuGraph allows users to approximate the area under the curve using the Left End Point Method of Riemann sums. Note that the area under the curve is always positive; ie., even though the y-value is negative, the area will still be positive.

```javascript
const area = function(graph, equation){
  if (graph.integral === true){
    let xStart = parseFloat($('#lBound')[0].value);
    let xEnd = parseFloat($('#uBound')[0].value);
    let numRec = parseInt($('#nRec')[0].value);
    let deltaX = equation.deltaX(xStart, xEnd, numRec);
    let area = 0;
    for (var i = 0; i < numRec; i++) {
      let currX = xStart + i * deltaX;
      let currY = equation.extractY(currX);
      graph.drawRec(currX, currY, deltaX, currY);
      area += Math.abs(deltaX * currY);
    }
    $('#area')[0].value = Math.round(area * 100) / 100;
  }
};
```
![alt text](https://github.com/idannyou/calcu_graph/blob/master/images/Area_Equation_1.gif "Integral Equation")



## Next steps for further development of CalcuGraph

- Adding more Riemann sum methods (mid-point, right end point, and trapezoid).
- Using an approximated slope method to determine the slope instead of using math.js derivative function, which cannot evaluate the absolute function.
- Adding polar functionality.
