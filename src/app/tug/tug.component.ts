import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { CmdbuttonComponent } from '../cmdbutton/cmdbutton.component';
import { P3dcmdService} from '../p3dcmd.service';

@Component({
  selector: 'app-tug',
  templateUrl: './tug.component.html',
  styleUrls: ['./tug.component.css']
})
export class TugComponent implements OnInit {

  constructor(private p3dcmd: P3dcmdService) { }

  ngOnInit() {
  }

  private logFailure(data) : void {
    console.log("Failed: " + data.reason + data.code);
  }

 

  sendControlValue(cmd : string, value : string ) : void {
    var movement : number = -parseInt(value);
    var cmd = "cmd/" + cmd + "?value=" + movement.toFixed() + "&target=tug";

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
