

class Graph {

  constructor(ctx, xMin = -10, xMax = 10, yMin = -10, yMax = 10){
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    // conversion to get pixels from raw x and y
    // used for scaling
    this.xConversion = this.canvas.width / (xMax - xMin);
    this.yConversion = this.canvas.height / (yMax - yMin);
  }

  onLoad(){
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      // translate changes the center of your canvas
      this.ctx.translate(this.xMax * this.xConversion, this.yMax * this.yConversion);
      this.drawAxis();
    }
  }

  // drawing the axis

  drawAxis(){
    this.clearGraph();
    this.drawXAxis();
    this.drawYAxis();
  }

  drawXAxis(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(this.xMin * this.xConversion, 0);
    this.ctx.lineTo(this.xMax * this.xConversion, 0);
    this.ctx.stroke();
  }

  drawYAxis(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    // multiply by negative because canvas positive y goes down =(
    this.ctx.moveTo(0, -1*this.yMin * this.yConversion);
    this.ctx.lineTo(0, -1*(this.yMax * this.yConversion));
    this.ctx.stroke();
  }

  drawDots(x, y){
    this.ctx.beginPath();
    this.ctx.arc(x * this.xConversion,y * this.yConversion,1,0,2*Math.PI);
    this.ctx.stroke();
  }

  clearGraph(){
    this.ctx.clearRect(-this.width/2,-this.height/2,this.width,this.height);
  }



}

export default Graph;
