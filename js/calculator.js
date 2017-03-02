import MathQuill from 'mathquill/build/mathquill';
import Graph from './graph';
import Equation from './equation';






const plotXY = function(graph, equation){
  let numPoints = parseInt($('#numPoints')[0].value) || 1000;
  graph.drawAxis();
  let deltaX = ((graph.xMax - graph.xMin) / numPoints);
  for (var i = 0; i < numPoints + 1; i++) {
    let x = (graph.xMin)+ (deltaX * i);
    graph.drawDots(x, equation.extractY(x), numPoints);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  var ctx = canvas.getContext('2d');
  var eq = document.getElementById('latex').innerHTML;
  let graph = new Graph(ctx);
  let equation = new Equation(eq);
  graph.onLoad();
  equation.bindEvent();
  // re-render graph
  $('#latex').on('DOMSubtreeModified', () => plotXY(graph, equation));

  // gets number of points
  $('#numPoints').on('change', () => plotXY(graph, equation));
});
