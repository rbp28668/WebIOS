import { Component, OnInit, Input} from '@angular/core';
import { P3dcmdService} from '../p3dcmd.service';
@Component({
  selector: 'cmd-button',
  templateUrl: './cmdbutton.component.html',
  styleUrls: ['./cmdbutton.component.css']
})
export class CmdbuttonComponent implements OnInit {

  // Statuses for setting style
  is_sending : boolean = false;
  is_err : boolean = false;

  @Input() caption : string = 'Unknown';
  @Input() cmd : string = '??';

  constructor(private p3dcmd: P3dcmdService) { }

  ngOnInit() {
  }

  sendCommand() {
    this.is_sending = true;
    this.p3dcmd.runCommand(this.cmd).subscribe( data => {
      console.log("Data");
      setTimeout( () => {
        this.is_sending = false;
      }, 100);
    },
    (err: any) => { // on error
      console.log(err);
      this.is_sending = false;
      this.is_err = true;
      setTimeout( () => {
        this.is_err = false;
      }, 500); // rather longer
    });
  }

}
