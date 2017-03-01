
class Equation{

  constructor(equation){
    this.equation = equation;
  }

  bindEvent(){
    $('#latex').on('DOMSubtreeModified', this.extractEquation);
  }

  extractEquation(){
    this.equation = $('#latex')[0].innerHTML;
  }





}

export default Equation;
