import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { CmdbuttonComponent } from '../cmdbutton/cmdbutton.component';
import { P3dcmdService} from '../p3dcmd.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {

  constructor(private p3dcmd: P3dcmdService) { }

  ngOnInit() {
  }

  private logFailure(data) : void {
    console.log("Failed: " + data.reason + data.code);
  }

 

  // Use this to update the altimeter setting button when the hPa field changes.
  updatehPaCmd(button : CmdbuttonComponent, hPa : FormControl) : void {
    button.cmd = "cmd/KOHLSMAN_SET?value=" + (16*Number(hPa.value));
  }

  sendControlValue(cmd : string, value : string ) : void {
    var movement : number = -parseInt(value);
    var cmd = "cmd/" + cmd + "?value=" + movement.toFixed();

    this.p3dcmd.runCommand(cmd).subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error sending command");
      console.log(err);
    });

  }

  
}
