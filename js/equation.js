import math from 'mathjs/dist/math';

class Equation{

  constructor(equation){
    this.equation = equation;
    this.parseEquation = math.parse(this.equation);

    this.extractY = this.extractY.bind(this);
  }

  bindEvent(){
    $('#latex').on('DOMSubtreeModified', () => {
      this.extractEquation();
    });


  }

  extractEquation(){
    this.equation = $('#latex')[0].innerHTML;
    this.parseEquation = math.compile(this.equation);
  }

  extractY(input){
    return (-1*this.parseEquation.eval({x: input}));
  }





}

export default Equation;
