
class View{

  constructor(graph, equation){
    this.graph = graph;
    this.equation = equation;
    this.turnoffHow = this.turnoffHow.bind(this);
  }

  displayCoordinate({x, y}){
    $('#coordinate')[0].value = `(${x},${y})`;
  }

  displayTracer(x,y){
      y = Math.round(y * 100) / 100;
      $('#tCoordinate')[0].value = `(${x},${y})`;
  }

  displayDerivative(equation){
    $('.derivative')[0].value = equation.tangentStr;
  }

  displayMinMax(graph){
    $('#xMin')[0].value = Math.round(graph.xMin * 100) / 100;
    $('#xMax')[0].value = Math.round(graph.xMax * 100) / 100;
    $('#yMin')[0].value = Math.round(graph.yMin * 100) / 100;
    $('#yMax')[0].value = Math.round(graph.yMax * 100) / 100;
  }

  displayInitialMinMax(graph){
    $('#xMin')[0].value = graph.xMin;
    $('#xMax')[0].value = graph.xMax;
    $('#yMin')[0].value = graph.yMin;
    $('#yMax')[0].value = graph.yMax;
  }

  displayHow(string){
    event.stopPropagation();
    let modal = $(`.${string}`);
    $(modal).removeClass('hidden');
    $('#modalbackground').removeClass('hidden');
    $(document).on('click', ()=>{
      this.turnoffHow(string);
    });
  }

  turnoffHow(string){
    $(`.${string}`).addClass('hidden');
    $('#modalbackground').addClass('hidden');
  }



}

export default View;
