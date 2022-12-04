import { Component, OnInit } from '@angular/core';
import { P3dcmdService} from '../p3dcmd.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(private p3dcmd: P3dcmdService) { }

  ngOnInit() {
  }

  private logFailure(data:any) : void {
    console.log("Failed: " + data.reason + data.code);
  }


  logOn(memberName : String, membershipNumber : string) {
    this.p3dcmd.logOn(memberName, Number(membershipNumber)).subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error logging on");
      console.log(err);
    });

  }

  logOff() {
    this.p3dcmd.logOff().subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error logging off");
      console.log(err);
    });

  }

  logInfo(message : String) {
    this.p3dcmd.logInfo(message).subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error logging message");
      console.log(err);
    });

  }
}
