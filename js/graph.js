

class Graph {

  constructor(ctx, xMin = -10, xMax = 10, yMin = -10, yMax = 10){
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.mousedown = false;
    this.clickPos = null;

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    // conversion to get pixels from raw x and y
    // used for scaling
    this.xConversion = this.canvas.width / (xMax - xMin);
    this.yConversion = this.canvas.height / (yMin - yMax);

  }

  onLoad(){
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      // translate changes the center of your canvas
      // this.translateGraph();
      this.drawAxis(1);
    }
  }

  //translate graph
  // translateGraph(){
  //   // reset translate
  //   this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  //   this.ctx.translate(Math.abs(this.convertXtoP(this.xMin)), Math.abs(this.convertYtoP(this.yMin)));
  // }

  // drawing the axis

  drawAxis(unitsPerTick){
    this.drawXAxis(unitsPerTick);
    this.drawYAxis(unitsPerTick);
  }

  drawXAxis(unitsPerTick){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(this.convertXtoP(this.xMin), this.convertYtoP(0));
    this.ctx.lineTo(this.convertXtoP(this.xMax), this.convertYtoP(0));
    this.ctx.stroke();

    // draw left ticks
    let xPosL = this.convertXtoP(0);
    let ticks = this.convertXtoP(unitsPerTick) - xPosL;
    while (xPosL > this.convertXtoP(this.xMin)){
      xPosL -= ticks;
      this.ctx.moveTo((xPosL), 500);
      this.ctx.lineTo((xPosL), -500);
      this.ctx.stroke();
      this.ctx.fillText(`${this.convertPtoX(xPosL)}`,(2 + xPosL),10);

    }

    // draw right ticks
    let xPosR = this.convertXtoP(0);
    while (xPosR < this.convertXtoP(this.xMax)){
      xPosR += ticks;
      this.ctx.moveTo((xPosR), 500);
      this.ctx.lineTo((xPosR), -500);
      this.ctx.stroke();
      this.ctx.fillText(`${this.convertPtoX(xPosR)}`,(2 + xPosR),10);
    }


  }

  drawYAxis(unitsPerTick){
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    // multiply by negative because canvas positive y goes down =(
    this.ctx.moveTo(this.convertXtoP(0), this.convertYtoP(this.yMin));
    this.ctx.lineTo(this.convertXtoP(0), this.convertYtoP(this.yMax));
    this.ctx.stroke();

    // draw bot ticks
    let yPosB = this.convertYtoP(0);
    let ticks = this.convertYtoP(unitsPerTick) - yPosB;
    while (yPosB < this.convertYtoP(this.yMin)){
      yPosB -= ticks;
      this.ctx.moveTo(500, (yPosB));
      this.ctx.lineTo(-500, (yPosB));
      this.ctx.stroke();
      this.ctx.fillText(`${this.convertPtoX(xPosR)}`,(2 + xPosR),10);
    }

    // draw top ticks
    let yPosT = this.convertYtoP(0);
    while (yPosT > this.convertYtoP(this.yMax)){
      yPosT += ticks;
      this.ctx.moveTo(500, (yPosT));
      this.ctx.lineTo(-500, (yPosT));
      this.ctx.stroke();
    }
  }

  drawDots(x, y){
    this.ctx.beginPath();
    this.ctx.arc(this.convertXtoP(x), this.convertYtoP(y),1,0,2*Math.PI);
    this.ctx.stroke();
  }

  convertXtoP(x){
    // if(x <= 0){
    //   return x * this.xConversion;
    // } else {
      return parseFloat((x - this.xMin) * this.xConversion);
    // }
  }

  convertYtoP(y){
    // if(y <= 0){
    //   return y * this.yConversion;
    // } else {
      return parseFloat((y - this.yMax) * this.yConversion);
    // }
  }

  convertPtoX(xPixal){
    return Math.round(((xPixal / this.xConversion) + this.xMin)*100)/100;
  }

  convertPtoY(yPixal){
    return Math.round(((yPixal / this.yConversion) + this.yMax)*100)/100;
  }

  clearGraph(){
    this.ctx.clearRect(0,0,this.width, this.height);
    this.xConversion = this.width / (this.xMax - this.xMin);
    this.yConversion = this.height / (this.yMin - this.yMax);
    // this.translateGraph();
  }

  resetWindow(xMin,xMax,yMin,yMax){
    this.clearGraph();

    if(xMin === 0){
      this.xMin = xMin;
    }
    if(xMax === 0){
      this.xMax = xMax;
    }
    if(yMin === 0){
      this.yMin = yMin;
    }
    if(yMax === 0){
      this.yMax = yMax;
    }
    this.xMin = xMin || this.xMin;
    this.xMax = xMax || this.xMax;
    this.yMin = yMin || this.yMin;
    this.yMax = yMax || this.yMax;

    this.clearGraph();
  }

  getMousePos(canvas, event){
    var rect = canvas.getBoundingClientRect();
    return {
      x: this.convertPtoX((event.clientX - rect.left)),
      y: this.convertPtoY((event.clientY - rect.top))
    };
  }

  panning(){
    console.log(this.mousedown)
    if (this.mousedown === true){
      let xCurr = this.getMousePos(canvas, event).x;
      let yCurr = this.getMousePos(canvas, event).y;
      let posDeltaX = (this.clickPos.x - xCurr)/1.5;
      let posDeltaY = (this.clickPos.y - yCurr)/1.5;
      this.clickPos.x = xCurr;
      this.clickPos.y = yCurr;
      let deltaX = this.xMax - this.xMin;
      let deltaY = this.yMax - this.yMin;
      this.xMin = this.xMin - posDeltaX;
      this.yMin = this.yMin - posDeltaY;
      this.xMax = this.xMin + deltaX;
      this.yMax = this.yMin + deltaY;
    }

  }

  onClick(){
    this.clickPos = this.getMousePos(canvas, event);
    this.mousedown = true;
  }

  offPanning(){
    this.mousedown = false;
  }


}

export default Graph;
