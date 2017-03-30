import MathQuill from 'mathquill/build/mathquill';
import Graph from './graph';
import Equation from './equation';
import View from './view';

const plotXY = function(graph, equation, view){
  event.preventDefault();
  const numPoints = parseInt($('#numPoints')[0].value) || 1000;
  const unitsPerTick = parseFloat($('#unitTicks')[0].value) || tickSize(graph);
  if (graph.xMax > graph.xMin && graph.yMax > graph.yMin){

    graph.clearGraph();
    graph.drawAxis(unitsPerTick);
    const deltaX = ((graph.xMax - graph.xMin) / numPoints);
    for (let i = 0; i < numPoints; i++) {
      const x = (graph.xMin)+ (deltaX * i);
      const y = equation.extractY(x);
      graph.drawDots(x, y);
    }
    view.displayMinMax(graph);
  }
};

const tickSize= function(graph){
    let delta = graph.xMax - graph.xMin;

    if (delta > 200) return 10 ** (Math.floor(Math.log10(delta))-1) * 5;
    if (delta > 40) return 5;
    if (delta < 2) return 10**Math.floor(Math.log10(delta/2));
    return 1;
};

const plotTanLine = function(graph, equation, view, currX, currY){
  event.preventDefault();
  const m = equation.extractDyDx(currX);
  const xMin = graph.xMin;
  const xMax = graph.xMax;
  const yMin = equation.extractTanLine(m, currX, currY, xMin);
  const yMax = equation.extractTanLine(m, currX, currY, xMax);
  graph.drawLine(xMin, xMax, yMin, yMax);
  view.displayDerivative(equation);
};

const tracing = function(graph, equation, view){
  event.preventDefault();
  if (graph.trace === true){
    const x = graph.getMousePos(canvas).x;
    const y = equation.extractY(x);
    graph.drawTracerDot(x,y);
    view.displayTracer(x,y);

    if(graph.derivative){
      plotTanLine(graph, equation, view, x, y);
    }

  }
};

const area = function(graph, equation){
  event.preventDefault();
  if (graph.integral === true){
    const xStart = parseFloat($('#lBound')[0].value);
    const xEnd = parseFloat($('#uBound')[0].value);
    const numRec = parseInt($('#nRec')[0].value);
    const deltaX = equation.deltaX(xStart, xEnd, numRec);
    let area = 0;
    for (let i = 0; i < numRec; i++) {
      const currX = xStart + i * deltaX;
      const currY = equation.extractY(currX);
      graph.drawRec(currX, currY, deltaX, currY);
      area += Math.abs(deltaX * currY);
    }
    $('#area')[0].value = Math.round(area * 100) / 100;
  }
};

const handleTracerOn = function(){
  $('#tCoordinate').removeClass('hidden');
  $("#derivative").removeAttr("disabled");
};

const handleTracerOff = function(graph){
  $('#tCoordinate').addClass('hidden');
  $("#derivative")[0].checked = false;
  $("#derivative").attr("disabled", true);
  handleDerivativeOff(graph);
};

const handleDerivativeOn = function(){
  $('.derivative').removeClass('hidden');
}

const handleDerivativeOff = function(graph){
  $('.derivative').addClass('hidden');
  graph.derivative = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const ctx = canvas.getContext('2d');
  const eq = document.getElementById('latex').innerHTML;
  const graph = new Graph(ctx);
  const equation = new Equation(eq);
  const view = new View(graph, equation);
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
  $('#xMin').on('change', () => {
    const xMin = parseFloat(document.getElementById('xMin').value);
    graph.resetWindow(xMin, graph.xMax, graph.yMin, graph.yMax);
    plotXY(graph, equation, view);
  });
  $('#xMax').on('change', () => {
    const xMax = parseFloat(document.getElementById('xMax').value);
    graph.resetWindow(graph.xMin, xMax, graph.yMin, graph.yMax);
    plotXY(graph, equation, view);
  });
  $('#yMin').on('change', () => {
    const yMin = parseFloat(document.getElementById('yMin').value);
    graph.resetWindow(graph.xMin, graph.xMax, yMin, graph.yMax);
    plotXY(graph, equation, view);
  });
  $('#yMax').on('change', () => {
    const yMax = parseFloat(document.getElementById('yMax').value);
    graph.resetWindow(graph.xMin, graph.xMax, graph.yMin, yMax);
    plotXY(graph, equation, view);
  });

  //initial min max values
  view.displayInitialMinMax(graph);
  //

  // coordinate
  canvas.addEventListener('mousemove', () => view.displayCoordinate(graph.getMousePos(canvas)));

  // panning
  $('#canvas').mousedown( () => {
    graph.onClick();
  });

  $('#canvas').mousemove(() => {
    graph.panning();
    plotXY(graph, equation, view);
    tracing(graph, equation, view);
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
  $('#tracer').on('click', ()=> {
    graph.trace = document.getElementById('tracer').checked;
    (graph.trace)? handleTracerOn() :
      handleTracerOff(graph);
  });

  //derivatives
  $('#derivative').on('click', ()=> {
    graph.derivative = document.getElementById('derivative').checked;
    (graph.derivative)? handleDerivativeOn() :
      handleDerivativeOff(graph);
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

  // instructions
  $('#howtouse').on('click', () => {
    view.displayHow('howtouse');
  });

  $('#howtoinput').on('click', () => {
    view.displayHow('howtoinput');
  });

  $('#howtoder').on('click', () => {
    view.displayHow('howtoder');
  });

  $('#howtoarea').on('click', () => {
    view.displayHow('howtoarea');
  });


});
