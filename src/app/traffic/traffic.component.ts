import { Component, OnInit } from '@angular/core';
import { P3dcmdService} from '../p3dcmd.service';


@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.css']
})
export class TrafficComponent implements OnInit {

  // Available aricraft types
  private aircraft : Array<String> = new Array<String>();

  // IGC files
  private files : Array<String> = new Array<String>();

  private logFailure(data) : void {
    console.log("Failed: " + data.reason + data.code);
  }

  constructor(private p3dcmd: P3dcmdService) { }

  ngOnInit() {
    this.p3dcmd.trafficAircraft().subscribe( data => {
      if(data.status === "OK") {
        data.aircraft.forEach( aircraft => {
          this.aircraft.push(aircraft.title);
        });

      } else { // failed
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error fetching aircraft");
      console.log(err);
    });
  }



  public trafficLaunch(
    range: number,
    speedKts: number,
    bearing: number,
    name: String,
    tail_number: String,
    relative_height: number
  ) {
    this.p3dcmd.trafficLaunch(
      range, speedKts, bearing, name, tail_number, relative_height)
      .subscribe(data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error launching aircraft");
      console.log(err);
    });
  }

  public igcLaunch() {

  }

  public igcClear() {

  }

  // Returns the list of IGC files
  public getIGCFiles() : Array<String> {
    return this.files;
  }

    // Returns the list of available aircraft
  public getAvailableAircraft() : Array<String> {
      return this.aircraft;
  }
  
}
