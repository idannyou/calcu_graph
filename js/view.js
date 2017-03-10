
class View{

  constructor(graph, equation){
    this.graph = graph;
    this.equation = equation;
  }

  displayCoordinate({x, y}){
    $('#coordinate')[0].value = `(${x},${y})`;
  }



}

export default View;
