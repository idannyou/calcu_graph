import math from 'mathjs/dist/math';

class Equation{

  constructor(equation){
    this.equation = equation;
    this.parseEquation = null;
    this.derivativeEquation = math.derivative(equation, 'x').toString();
    this.parseDerivative = null;

    this.extractY = this.extractY.bind(this);

  }

  extractEquation(){
    this.equation = $('#textSpan')[0].innerHTML;
    this.parseEquation = math.compile(this.equation);
    this.derivativeEquation = math.derivative(this.equation, 'x').toString();
    this.parseDerivative = math.compile(this.derivativeEquation);
  }

  extractY(input){
    return (this.parseEquation.eval({x: input}));
  }

  extractDyDx(input){
    return (this.parseDerivative.eval({x: input}));
  }




}

export default Equation;
