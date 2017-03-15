class Graph {

  constructor(ctx, xMin = -10, xMax = 10, yMin = -10, yMax = 10){
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    // for panning
    this.mousedown = false;
    this.clickPos = null;

    // for tracing
    this.trace = false;
    this.graphHash = {};

    // for derivative
    this.derivative = false;

    // for integral
    this.integral = false;

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

  // drawing the axis

  drawAxis(unitsPerTick){
    this.drawXAxis(unitsPerTick);
    this.drawYAxis(unitsPerTick);
  }

  drawXAxis(unitsPerTick){

    // draw left ticks
    let xPosL = this.convertXtoP(0);
    const ticks = this.convertXtoP(unitsPerTick) - xPosL;
    if (unitsPerTick > (this.xMax - this.xMin)) return null;
    while (xPosL > this.convertXtoP(this.xMin)){
      xPosL -= ticks;
      this.ctx.fillStyle = 'black';
      this.ctx.strokeStyle = 'rgb(240,240,240)';
      this.ctx.beginPath();
      this.ctx.moveTo((xPosL), this.width);
      this.ctx.lineTo((xPosL), -1 * this.width);
      this.ctx.stroke();
      this.ctx.fillText(`${this.convertPtoX(xPosL)}`,(2 + xPosL),10);
    }

    // draw right ticks
    let xPosR = this.convertXtoP(0);
    while (xPosR < this.convertXtoP(this.xMax)){
      xPosR += ticks;
      this.ctx.fillStyle = 'black';
      this.ctx.strokeStyle = 'rgb(240,240,240)';
      this.ctx.beginPath();
      this.ctx.moveTo((xPosR), this.width);
      this.ctx.lineTo((xPosR), -1 * this.width);
      this.ctx.stroke();
      this.ctx.fillText(`${this.convertPtoX(xPosR)}`,(2 + xPosR),10);
    }

    //draw axis
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(this.convertXtoP(this.xMin), this.convertYtoP(0));
    this.ctx.lineTo(this.convertXtoP(this.xMax), this.convertYtoP(0));
    this.ctx.stroke();

  }

  drawYAxis(unitsPerTick){

    // draw bot ticks
    let yPosB = this.convertYtoP(0);
    const ticks = this.convertYtoP(unitsPerTick) - yPosB;
    if (unitsPerTick > (this.yMax - this.yMin)) return null;
    while (yPosB < this.convertYtoP(this.yMin)){
      yPosB -= ticks;
      this.ctx.strokeStyle = 'rgb(240,240,240)';
      this.ctx.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.moveTo(this.height, (yPosB));
      this.ctx.lineTo(-1 * this.height, (yPosB));
      this.ctx.stroke();
      this.ctx.fillText(`${this.convertPtoY(yPosB)}`,10, (-2 + yPosB));
    }

    // draw top ticks
    let yPosT = this.convertYtoP(0);
    while (yPosT > this.convertYtoP(this.yMax)){
      yPosT += ticks;
      this.ctx.strokeStyle = 'rgb(240,240,240)';
      this.ctx.fillStyle = 'black';
      this.ctx.beginPath();
      this.ctx.moveTo(this.height, (yPosT));
      this.ctx.lineTo(-1 * this.height, (yPosT));
      this.ctx.stroke();
      this.ctx.fillText(`${this.convertPtoY(yPosT)}`, 10, (-2 + yPosT));
    }

    // draw axis
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    // multiply by negative because canvas positive y goes down =(
    this.ctx.moveTo(this.convertXtoP(0), this.convertYtoP(this.yMin));
    this.ctx.lineTo(this.convertXtoP(0), this.convertYtoP(this.yMax));
    this.ctx.stroke();

  }

  drawDots(x, y){
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(this.convertXtoP(x), this.convertYtoP(y),1,0,2*Math.PI);
    this.ctx.stroke();
  }

  drawTracerDot(x, y){
    this.ctx.fillStyle = 'rgb(248, 170, 43)';
    this.ctx.beginPath();
    this.ctx.arc(this.convertXtoP(x), this.convertYtoP(y),5,0,2*Math.PI);
    this.ctx.fill();
  }

  drawLine(xMin, xMax, yMin, yMax){
    this.ctx.beginPath();
    this.ctx.moveTo(this.convertXtoP(xMin), this.convertYtoP(yMin));
    this.ctx.lineTo(this.convertXtoP(xMax), this.convertYtoP(yMax));
    this.ctx.stroke();
  }

  drawRec(x, y, deltaX, deltaY){

    const xPix = this.convertXtoP(x);
    const yPix = this.convertYtoP(y);
    const deltaXPix = this.convertXtoP(deltaX) - this.convertXtoP(0);
    const deltaYPix = this.convertYtoP(0) - this.convertYtoP(deltaY);
    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.fillRect(xPix, yPix, deltaXPix, deltaYPix);

  }



  convertXtoP(x){
      return parseFloat((x - this.xMin) * this.xConversion);
  }

  convertYtoP(y){
      return parseFloat((y - this.yMax) * this.yConversion);
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
  }

  resetWindow(xMin,xMax,yMin,yMax){
    if (xMax > xMin && yMax > yMin){
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
    } else {
      alert('Check Boundaries');
    }

  }

  getMousePos(canvas){
    var rect = canvas.getBoundingClientRect();
    return {
      x: this.convertPtoX((event.clientX - rect.left)),
      y: this.convertPtoY((event.clientY - rect.top))
    };
  }

  panning(){
    if (this.mousedown === true){
      const xCurr = this.getMousePos(canvas, event).x;
      const yCurr = this.getMousePos(canvas, event).y;
      // constant to lower the panning speed
      const posDeltaX = (this.clickPos.x - xCurr)/1.2;
      const posDeltaY = (this.clickPos.y - yCurr)/1.2;
      this.clickPos.x = xCurr;
      this.clickPos.y = yCurr;
      const deltaX = this.xMax - this.xMin;
      const deltaY = this.yMax - this.yMin;
      this.xMin = this.xMin - posDeltaX;
      this.yMin = this.yMin - posDeltaY;
      this.xMax = this.xMin + deltaX;
      this.yMax = this.yMin + deltaY;
    }

  }

  zooming(){
      const scale = (event.deltaY) / 1000;
        this.xMin = (this.xMin) - (this.xMin * scale);
        this.xMax = (this.xMax) - (this.xMax * scale);
        this.yMin = (this.yMin) - (this.yMin * scale);
        this.yMax = (this.yMax) - (this.yMax * scale);
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
