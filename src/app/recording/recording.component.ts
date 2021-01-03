import { Component, OnInit } from '@angular/core';
import { P3dcmdService} from '../p3dcmd.service';



@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.css']
})
export class RecordingComponent implements OnInit {

  private recordings : Array<String> = [];

  constructor(private p3dcmd: P3dcmdService) { }


  private logFailure(data) : void {
    console.log("Failed: " + data.reason + data.code);
  }
  
   // Initialise the model.
   ngOnInit() : void {
    console.log("Recording component ngOnInit");
    this.loadRecordings();
   }

  private loadRecordings() : void {
    this.p3dcmd.recordList().subscribe( data => {
      // Process resulting list
      if(data.status === "OK") {
        data.recordings.forEach( (item: any) => {
          console.log(item.recording);
          this.recordings.push(item.recording);
        });

      } else { // failed
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error fetching recordings");
      console.log(err);
    });
  }

  // Note analyse also needs to pull back the generated bitmap(s) from Pictures/Prepar3D V4 Files
  analyse(): void {
    this.p3dcmd.recordAnalyse().subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error fetching scenarios");
      console.log(err);
    });
  }

  getRecordings() : Array<String> {
    return this.recordings;
  }


  playRecording(name : String): void {
    this.p3dcmd.recordPlay(name).subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error playing recording");
      console.log(err);
    });
  }

  startRecording(start_button : HTMLButtonElement, stop_button : HTMLButtonElement): void {
    this.p3dcmd.recordStart().subscribe( data => {
      if(data.status === "OK") {
        start_button.disabled = true;
        stop_button.disabled = false;
      } else {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error starting recording");
      console.log(err);
    });
  }
  
  stopRecording(title : String, description : String, start_button : HTMLButtonElement, stop_button : HTMLButtonElement): void {
    this.p3dcmd.recordStop(title, description).subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error playing recording");
      console.log(err);
    });

    // Update buttons regardless of whether function succeeded or not.  Makes sure we don't get stuck in recording state.
    start_button.disabled = false;
    stop_button.disabled = true;

  }


}
