import { Component, OnInit } from '@angular/core';
import { P3dcmdService} from '../p3dcmd.service';
import { NamedItem } from '../named-item';
import { NamedItemComponent} from '../named-item/named-item.component';
import { FormControl} from '@angular/forms';
// A list of named items with a common (site) name.
class NamedItemList {
  public name : String;
  public items : Array<NamedItem>;
  private index : number;

  constructor(name: String, index:number) {
    this.name = name;
    this.items = new Array<NamedItem>();
    this.index = index;
  }

  add(item : NamedItem) : void {
    this.items.push(item);
  }

  isFirst() : boolean {
    return this.index == 0;
  }
}

// List of pages of scenarios.
// TODO maybe look at improving with StringMap
class GroupedItems {
    public pages : Array<NamedItemList> = new Array<NamedItemList>();

    public add(item : NamedItem) : void {
      var fragments = item.filename.split('_');
      var site = "Other";
      if(fragments[0] === 'IOS') {
        site = fragments[1];
      }

      var page = this.findItemsFor(site);
      if(page == null) {
        page = new NamedItemList(site, this.pages.length);
        this.pages.push(page);
      }
      page.add(item);
    }

    private findItemsFor(site : String) : NamedItemList {
      var page = null;
      this.pages.forEach( p => {
        if(p.name === site) {
          page = p;
        }
      });
      return page;
    }

    // Function that's guaranteed to return a list even if no match.
    public safeFindItemsFor(site : String) : NamedItemList {
      var page: NamedItemList = this.findItemsFor(site);
      if(page === null){
        page = new NamedItemList("",0);
      }
      return page;
    }
}

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css']
})
export class ScenariosComponent implements OnInit {

  //private scenarios : StringMap<string, Array<NamedItem>>;
  private scenarios : GroupedItems = new GroupedItems();
  private positions : GroupedItems = new GroupedItems();

  constructor(private p3dcmd: P3dcmdService) { }

  // Initialise the model.
  ngOnInit() : void {
    console.log("Scenarios component ngOnInit");
    this.loadScenarios();
    this.loadPositions();
  }

  private logFailure(data) : void {
    console.log("Failed: " + data.reason + data.code);
  }

  private loadScenarios() : void {
    this.p3dcmd.scenariosList("IOS").subscribe( data => {
      // Process resulting list
      if(data.status === "OK") {
        data.entries.forEach( item => {
          this.scenarios.add(item);
        });

      } else { // failed
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error fetching scenarios");
      console.log(err);
    });

  }

  private loadPositions() : void {
    this.p3dcmd.positionList("IOS").subscribe( data => {
      // Process resulting list
      if(data.status === "OK") {
        data.entries.forEach( item => {
          this.positions.add(item);
        });

      } else { // failed
        this.logFailure(data);
      }
    }, (err: any) => { // on error
      console.log("Error fetching positions");
      console.log(err);
    });

  }

  saveScenario(details: NamedItemComponent) : void {
    this.p3dcmd.scenariosSave(details.filename(), details.title(), details.description()).subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => {
      console.log("Error saving scenario");
      console.log(err);
    });
  }

  savePosition(details: NamedItemComponent) : void {
    this.p3dcmd.positionSave(details.filename(), details.title(), details.description()).subscribe( data => {
      if(data.status !== "OK") {
        this.logFailure(data);
      }
    }, (err: any) => {
      console.log("Error saving position");
      console.log(err);
    });
  }

  showCurrentPosition(control : FormControl){
      this.p3dcmd.positionCurrent().subscribe( data => {
        if(data.status === "OK"){
          var current = data.current;
          var contents : String = "";
          if(current.latitude) {
            contents += "Latitude " + current.latitude;
          }
          if(current.longitude) {
            contents += "Longitude " + current.longitude;
          }
          // etc...
          //control.setValue( contents);
          console.log(contents);
        } else {
          this.logFailure(data);
        }
      }, (err: any) => {
        console.log("Error saving position");
        console.log(err);
      });
  }

  // TODO - put interlock in so that slider and stop button are only
  // enabled when start is pressed.
  startRewind(rewind_slider){
    console.log(rewind_slider);
    this.p3dcmd.runCommand("/cmd/PAUSE_ON").subscribe( data => {
      if(data.status === "OK"){
        this.setSliderRange(rewind_slider);
      } else {
        this.logFailure(data);
      }
    }, (err: any) => {
      console.log("Error pausing sim");
      console.log(err);
    })
  }

  private setSliderRange(rewind_slider){
    this.p3dcmd.positionAvailable().subscribe( data => {
      if(data.status === "OK"){
        rewind_slider.value = 0;
        rewind_slider.min = 0;
        rewind_slider.max = data.length;
      } else {
        this.logFailure(data);
      }
    }, (err: any) => {
      console.log("Error fetching available positions");
      console.log(err);
    });
  }

  rewindChange(rewind_slider) : void {
    this.p3dcmd.positionBack(rewind_slider.value).subscribe( data => {
      if(data.status !== "OK"){
        this.logFailure(data);
      }
    }, (err: any) => {
      console.log("Error rewinding to position");
      console.log(err);
    });
  }


  stopRewind(rewind_slider) : void {
    this.p3dcmd.positionSet(rewind_slider.value).subscribe( data => {
      if(data.status === "OK"){
        this.unpauseSim();
      } else {
        this.logFailure(data);
      }
    }, (err: any) => {
      console.log("Error rewinding to set position");
      console.log(err);
    });
  }

  private unpauseSim() : void {
    this.p3dcmd.runCommand('cmd/PAUSE_OFF').subscribe( data => {
      if(data.status !== "OK"){
        this.logFailure(data);
      }
    }, (err: any) => {
      console.log("Error un-pausing sim");
      console.log(err);
    });
  }


  selectTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all active elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent_active");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].className = "tabcontent";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).className += "_active";
    evt.currentTarget.className += " active";
  }


  public getScenarios() : GroupedItems {
    return this.scenarios;
  } 
  public getPositions() : GroupedItems {
    return this.positions;
  } 

}
