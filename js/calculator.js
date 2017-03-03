import MathQuill from 'mathquill/build/mathquill';
import Graph from './graph';
import Equation from './equation';

const plotXY = function(graph, equation){
  let numPoints = parseInt($('#numPoints')[0].value) || 1000;
  let unitsPerTick = parseInt($('#unitTicks')[0].value) || 1;
  graph.clearGraph();
  graph.drawAxis(unitsPerTick);
  let deltaX = ((graph.xMax - graph.xMin) / numPoints);
  for (var i = 0; i < numPoints; i++) {
    let x = (graph.xMin)+ (deltaX * i);
    let y = equation.extractY(x);
    graph.drawDots(x, y, false);
    if(graph.derivative){
      plotTanLine(graph, equation, x);
    }
  }
};

const plotTanLine = function(graph, equation, x){
  let y = equation.extractDyDx(x);
  graph.drawDots(x, y2, false);
};

const tracing = function(graph, equation){
  if (graph.trace === true){
    if(!graph.clickPos) return null;
    let x = graph.clickPos.x;
    let y = equation.extractY(x);
    graph.drawDots(x,y, true);
    displayTracer(x,y);
  }
};

const displayCoordinate = function({x, y}){
  $('#coordinate')[0].value = `(${x},${y})`;
};

const displayTracer = function(x,y){
    y = Math.round(y * 100) / 100;
    $('#tCoordinate')[0].value = `(${x},${y})`;
};

document.addEventListener('DOMContentLoaded', () => {
  var ctx = canvas.getContext('2d');
  var eq = document.getElementById('latex').innerHTML;
  let graph = new Graph(ctx);
  let equation = new Equation(eq);
  graph.onLoad();

  // Event Listeners

  //update Equation
  $('#textSpan').on('DOMSubtreeModified', () => {
    equation.extractEquation();
  });

  // re-render graph
  $('#textSpan').on('DOMSubtreeModified', () => plotXY(graph, equation));

  // gets number of points and space between ticks
  $('#numPoints').on('change', () => plotXY(graph, equation));
  $('#unitTicks').on('change', () => plotXY(graph, equation));

  //reset window
  $('.reset').on('click', () => {
    graph.resetWindow(-10, 10, -10, 10);
    plotXY(graph,equation);
  });

  $('#xMin').on('change', () => {
    let xMin = parseInt(document.getElementById('xMin').value);
    graph.resetWindow(xMin, null, null, null);
    plotXY(graph,equation);
  });
  $('#xMax').on('change', () => {
    let xMax = parseInt(document.getElementById('xMax').value);
    graph.resetWindow(null, xMax, null, null);
    plotXY(graph,equation);
  });
  $('#yMin').on('change', () => {
    let yMin = parseInt(document.getElementById('yMin').value);
    graph.resetWindow(null, null, yMin, null);
    plotXY(graph,equation);
  });
  $('#yMax').on('change', () => {
    let yMax = parseInt(document.getElementById('yMax').value);
    graph.resetWindow(null, null, null, yMax);
    plotXY(graph,equation);
  });

  //

  // coordinate
  canvas.addEventListener('mousemove', (event) => displayCoordinate(graph.getMousePos(canvas, event)));

  // panning
  $('#canvas').mousedown( () => {
    graph.onClick();
  }).mousemove(() => {
    graph.panning();
    plotXY(graph,equation);
  });
  $(document).on('mouseup', () =>{
    graph.offPanning();
  });

  //tracing
  $('#canvas').mousemove(() => {
      tracing(graph,equation);
    });
  $('#tracer').on('click', ()=> {
    graph.trace = document.getElementById('tracer').checked;
  });

  //derivatives
  $('#derivative').on('click', ()=> {
    graph.derivative = document.getElementById('derivative').checked;
  });

});
