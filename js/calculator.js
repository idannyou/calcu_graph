import MathQuill from 'mathquill/build/mathquill';
import Graph from './graph';
import Equation from './equation';




document.addEventListener('DOMContentLoaded', () => {
  var ctx = canvas.getContext('2d');
  var eq = document.getElementById('latex').innerHTML;
  let graph = new Graph(ctx);
  let equation = new Equation(eq);
  graph.onLoad();
  equation.bindEvent();

});
