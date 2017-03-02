

class Graph {

  constructor(ctx, xMin = -100, xMax = 100, yMin = -10, yMax = 10){
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
      this.ctx.translate(Math.abs(this.convertXtoP(this.xMin)), Math.abs(this.convertYtoP(this.yMin)));
      this.drawAxis();
    }
  }

  // drawing the axis

  drawAxis(unitsPerTick){
    this.clearGraph();
    this.drawXAxis(unitsPerTick);
    this.drawYAxis(unitsPerTick);
  }

  drawXAxis(unitsPerTick){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(this.convertXtoP(this.xMin), 0);
    this.ctx.lineTo(this.convertXtoP(this.xMax), 0);
    this.ctx.stroke();

    // draw left ticks
    let xPosL = 0;
    let ticks = this.convertXtoP(unitsPerTick);
    while (xPosL > this.convertXtoP(this.xMin)){
      xPosL -= ticks;
      this.ctx.moveTo((xPosL), 5);
      this.ctx.lineTo((xPosL), -5);
      this.ctx.stroke();
    }

    // draw right ticks
    let xPosR = 0;
    while (xPosR < this.convertXtoP(this.xMax)){
      xPosR += ticks;
      this.ctx.moveTo((xPosR), 5);
      this.ctx.lineTo((xPosR), -5);
      this.ctx.stroke();
    }


  }

  drawYAxis(unitsPerTick){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    // multiply by negative because canvas positive y goes down =(
    this.ctx.moveTo(0, -1* this.convertYtoP(this.yMin));
    this.ctx.lineTo(0, -1* this.convertYtoP(this.yMax));
    this.ctx.stroke();

    // draw bot ticks
    let yPosB = 0;
    let ticks = this.convertYtoP(unitsPerTick);
    while (yPosB > this.convertYtoP(this.yMin)){
      yPosB -= ticks;
      this.ctx.moveTo(5, (yPosB));
      this.ctx.lineTo(-5, (yPosB));
      this.ctx.stroke();
    }

    // draw top ticks
    let yPosT = 0;
    while (yPosT < this.convertYtoP(this.yMax)){
      yPosT += ticks;
      this.ctx.moveTo(5, (yPosT));
      this.ctx.lineTo(-5, (yPosT));
      this.ctx.stroke();
    }
  }

  drawDots(x, y){
    this.ctx.beginPath();
    this.ctx.arc(this.convertXtoP(x), -1 * this.convertYtoP(y),1,0,2*Math.PI);
    this.ctx.stroke();
  }

  convertXtoP(x){
    return x * this.xConversion;
  }

  convertYtoP(y){
    return y * this.yConversion;
  }

  loadTicks(){

  }

  clearGraph(){
    this.ctx.clearRect(this.convertXtoP(this.xMin),this.convertYtoP(this.yMin),this.width, this.height);
  }



}

export default Graph;
