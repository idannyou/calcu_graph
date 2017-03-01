

class Graph {

  constructor(ctx, xMin = -10, xMax = 10, yMin = -10, yMax = 10){
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMin = yMin;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  onLoad(){
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      // translate changes the center of your canvas
      this.ctx.translate(this.width/2,this.height/2);
      this.drawXAxis();
      this.drawYAxis();
    }
  }

  // drawing the axis
  drawXAxis(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(-this.width/2, 0);
    this.ctx.lineTo(this.width/2, 0);
    this.ctx.stroke();
  }

  drawYAxis(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(0, -this.height/2);
    this.ctx.lineTo(0, this.height/2);
    this.ctx.stroke();
  }

  drawDots(){
    this.context.beginPath();
    
  }




  drawEquation(equation, color, thickness){
    var context = this.ctx;
      context.save();
      context.save();
      this.transformContext();

      context.beginPath();
      context.moveTo(this.minX, equation(this.minX));

      for(var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
        context.lineTo(x, equation(x));
      }

      context.restore();
      context.lineJoin = 'round';
      context.lineWidth = thickness;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
  }



}

export default Graph;
