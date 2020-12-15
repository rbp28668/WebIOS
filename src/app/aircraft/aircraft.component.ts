import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { CmdbuttonComponent } from '../cmdbutton/cmdbutton.component';
@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Use this to update the altimeter setting button when the hPa field changes.
  updatehPaCmd(button : CmdbuttonComponent, hPa : FormControl) : void {
    button.cmd = "cmd/KOHLSMAN_SET?value=" + (16*Number(hPa.value));
  }
}
