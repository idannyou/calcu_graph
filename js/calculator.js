import MathQuill from 'mathquill/build/mathquill';
import Graph from './graph';
import Equation from './equation';
import View from './view';

const plotXY = function(graph, equation, view){
  let numPoints = parseInt($('#numPoints')[0].value) || 1000;
  let unitsPerTick = parseFloat($('#unitTicks')[0].value) || 1;
  if (graph.xMax > graph.xMin && graph.yMax > graph.yMin){

    graph.clearGraph();
    graph.drawAxis(unitsPerTick);
    let deltaX = ((graph.xMax - graph.xMin) / numPoints);
    for (var i = 0; i < numPoints; i++) {
      let x = (graph.xMin)+ (deltaX * i);
      let y = equation.extractY(x);
      graph.drawDots(x, y);
    }
    view.displayMinMax(graph);
  }
};

const plotTanLine = function(graph, equation, view, currX, currY){
  let m = equation.extractDyDx(currX);
  let xMin = graph.xMin;
  let xMax = graph.xMax;
  let yMin = equation.extractTanLine(m, currX, currY, xMin);
  let yMax = equation.extractTanLine(m, currX, currY, xMax);
  graph.drawLine(xMin, xMax, yMin, yMax);
  view.displayDerivative(equation);
};

const tracing = function(graph, equation, view){
  if (graph.trace === true){
    if(!graph.clickPos) return null;
    let x = graph.getMousePos(canvas).x;
    let y = equation.extractY(x);
    graph.drawTracerDot(x,y);
    view.displayTracer(x,y);

    if(graph.derivative){
      plotTanLine(graph, equation, view, x, y);
    }

  }
};

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

document.addEventListener('DOMContentLoaded', () => {
  var ctx = canvas.getContext('2d');
  var eq = document.getElementById('latex').innerHTML;
  let graph = new Graph(ctx);
  let equation = new Equation(eq);
  let view = new View(graph, equation);
  graph.onLoad();

  // Event Listeners

  //update Equation
  $('#textSpan').on('DOMSubtreeModified', () => {
    equation.extractEquation();
  });

  // re-render graph
  $('#textSpan').on('DOMSubtreeModified', () => plotXY(graph, equation, view));

  // gets number of points and space between ticks
  $('#numPoints').on('change', () => plotXY(graph, equation, view));
  $('#unitTicks').on('change', () => plotXY(graph, equation, view));

  //reset window
  $('.reset').on('click', () => {
    graph.resetWindow(-10, 10, -10, 10);
    plotXY(graph, equation, view);
  });

  //min max changes
  $('#xMin').on('mouseleave', () => {
    let xMin = parseFloat(document.getElementById('xMin').value);
    graph.resetWindow(xMin, graph.xMax, graph.yMin, graph.yMax);
    plotXY(graph, equation, view);
  });
  $('#xMax').on('mouseleave', () => {
    let xMax = parseFloat(document.getElementById('xMax').value);
    graph.resetWindow(graph.xMin, xMax, graph.yMin, graph.yMax);
    plotXY(graph, equation, view);
  });
  $('#yMin').on('mouseleave', () => {
    let yMin = parseFloat(document.getElementById('yMin').value);
    graph.resetWindow(graph.xMin, graph.xMax, yMin, graph.yMax);
    plotXY(graph, equation, view);
  });
  $('#yMax').on('mouseleave', () => {
    let yMax = parseFloat(document.getElementById('yMax').value);
    graph.resetWindow(graph.xMin, graph.xMax, graph.yMin, yMax);
    plotXY(graph, equation, view);
  });

  //initial min max values
  view.displayInitialMinMax(graph);
  //

  // coordinate
  canvas.addEventListener('mousemove', (event) => view.displayCoordinate(graph.getMousePos(canvas)));

  // panning
  $('#canvas').mousedown( () => {
    graph.onClick();
  });

  $('#canvas').mousemove(() => {
    graph.panning();
    plotXY(graph, equation, view);
  });

  $(document).on('mouseup', () =>{
    graph.offPanning();
  });

  // zooming
  $('#canvas').on('wheel', () => {
    graph.zooming();
    plotXY(graph, equation, view);
  });

  //tracing
  $('#canvas').mousemove(() => {
    tracing(graph, equation, view);
  });

  $('#tracer').on('click', ()=> {
    graph.trace = document.getElementById('tracer').checked;
    (graph.trace)? $('#tCoordinate').removeClass('hidden') :
      $('#tCoordinate').addClass('hidden');
  });

  //derivatives
  $('#derivative').on('click', ()=> {
    graph.derivative = document.getElementById('derivative').checked;
    (graph.derivative)? $('.derivative').removeClass('hidden') :
      $('.derivative').addClass('hidden');
  });

  // integral
  $('#integral').on('click', ()=> {
    graph.integral = document.getElementById('integral').checked;
    if (graph.integral){
      $('.nRec').removeClass('hidden');
      $('.lBound').removeClass('hidden');
      $('.uBound').removeClass('hidden');
      $('.area').removeClass('hidden');
    } else {
      $('.nRec').addClass('hidden');
      $('.lBound').addClass('hidden');
      $('.uBound').addClass('hidden');
      $('.area').addClass('hidden');
      $('.nRec')[1].value = 0;
      $('.lBound')[1].value = 0;
      $('.uBound')[1].value = 0;
      $('.area')[1].value = 0;
    }

  });

  $('#canvas').mousemove(() => {
    area(graph,equation);
  });

});
