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

    this.p3dcmd.igcList(null).subscribe( data => {
      if(data.status === "OK") {
        data.entries.forEach( file => {
          this.files.push(file.filename);
        });

      } else { // failed
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error fetching IGC files");
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
    console.log(range + " " + bearing + " " + speedKts);
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

  public igcLaunch(igc_aircraft : String, igc_file : String, loop: boolean) {
    this.p3dcmd.igcTraffic(igc_file, igc_aircraft, loop)
    .subscribe(data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error launching igc aircraft");
      console.log(err);
    });

  }

  public igcClear() {
    this.p3dcmd.igcClear()
    .subscribe(data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error clearing igc aircraft");
      console.log(err);
    });

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
