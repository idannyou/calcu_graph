import math from 'mathjs/dist/math';

class Equation{

  constructor(equation){
    this.equation = equation;
    this.parseEquation = null;
    this.derivativeEquation = math.derivative(equation, 'x').toString();
    this.parseDerivative = null;
    this.tangentStr = null;

    this.extractY = this.extractY.bind(this);

  }

  extractEquation(){
    this.equation = $('#textSpan')[0].innerHTML;
    this.parseEquation = math.compile(this.equation);
    this.derivativeEquation = math.derivative(this.equation, 'x').toString();
    this.parseDerivative = math.compile(this.derivativeEquation);
  }

  extractY(input){
    if(!this.parseEquation) return undefined;
    return (this.parseEquation.eval({x: input}));
  }

  extractDyDx(input){
    if(!input) return undefined;
    return (this.parseDerivative.eval({x: input}));
  }

  extractTanLine(m, currX, currY, input){
    let b = Math.round((currY - m * currX) * 100) / 100;
    m = Math.round(m * 100) / 100;
    let string = `${m} * x + ${b}`;
    this.tangentStr = string;
    let parseTanLine = math.compile(string);
    return (parseTanLine.eval({x: input}));
  }

  // Riemann Sums

  deltaX(xStart, xEnd, numRec){
    return (xEnd - xStart)/numRec;
  }






}

export default Equation;
