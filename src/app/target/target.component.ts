//import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {

  // maximum value corresponding to the edge of the target
  @Input () range : number;
  // Units for any display of selected value.
  @Input () units : string;
  // scale down range to give number of lines to plot.
  @Input () divider : number;

  // Selected bearing
  public bearing : number = 0;

  // Selected value
  public value : number = 0;

  private radius : number = 0;

  constructor() {
    this.range = 5;
    this.units = "";
    this.divider = 1;
  }

  ngOnInit() {
    this.drawTarget();
  }

  private drawTarget() : void {
    const canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
   
    const context = canvas.getContext('2d');
    if(context === null) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const size = canvas.width;
    const half = size/2;
    const lines = this.range / this.divider;
    this.radius = half-3; // allow for linewidth = 5 later.

    context.beginPath();
    context.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#444';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'white';
    context.stroke();

    context.beginPath();
    context.strokeStyle = '#ffffff';
    context.lineWidth = 1;
    for(var i=1; i<=lines; ++i){
      context.arc(centerX, centerY, this.radius * i / lines, 0, 2 * Math.PI, false);
    }
    context.moveTo(0,half);
    context.lineTo(size,half);
    context.moveTo(half,0);
    context.lineTo(half,size);
    context.stroke();

  }

  public clicked(event : MouseEvent){
    //console.log(event);
    //console.log(event.clientX);
    //console.log(event.clientY);
    //console.log(event.target.offsetLeft);
    //console.log(event.target.offsetTop);

    this.drawTarget();

    var canvas = <HTMLCanvasElement>event.target;
    var context = canvas.getContext('2d');
    if(context === null) return;
    var size = canvas.width;
    var half = size/2;

    var x = event.clientX
     + (document.documentElement.scrollLeft || document.body.scrollLeft)
     - canvas.offsetLeft;
    var y = event.clientY
     + (document.documentElement.scrollTop || document.body.scrollTop)
     - canvas.offsetTop;
    // x and y now relative to top left of target.


    context.beginPath();
    context.strokeStyle = '#ffffff';
    context.lineWidth = 1;
    context.moveTo(half,half);
    context.lineTo(x,y);
    context.stroke();

    x = x - half;
    y = y - half;
    this.bearing = 90 + Math.atan2(y,x) * 180 / Math.PI;
    if(this.bearing < 0) this.bearing = this.bearing + 360;
    this.value = Math.sqrt(x*x + y*y) * this.range / this.radius;
    console.log("Target: " + this.value + ", " + this.bearing);
  }

  /* Sample code including scroll info
  private calculateMouseRelativePositionInCanvas(e: MouseEvent) {
    // Note: I have handled scroll effect
    this.mousePosition.x =
      e.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft) -
      this.canvas.offsetLeft;
    this.mousePosition.y =
      e.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop) -
      this.canvas.offsetTop;
  }
  */
}
