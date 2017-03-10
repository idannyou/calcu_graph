
class View{

  constructor(graph, equation){
    this.graph = graph;
    this.equation = equation;
  }

  displayCoordinate({x, y}){
    $('#coordinate')[0].value = `(${x},${y})`;
  }

  displayTracer(x,y){
      y = Math.round(y * 100) / 100;
      $('#tCoordinate')[0].value = `(${x},${y})`;
  }


}

export default View;
